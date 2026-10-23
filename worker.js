import { WorkerMailer } from "worker-mailer";

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LANGS = ["de", "en"];
const DEFAULT_LANG = "de";
const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const AUTOREPLY = {
  de: {
    subject: "Danke für deine Nachricht",
    greeting: (name) => `Hallo ${name},`,
    lines: [
      "vielen Dank für deine Nachricht! Sie ist bei mir angekommen, und ich melde mich so bald wie möglich bei dir.",
    ],
    closing: "Viele Grüße",
    note: "Diese Bestätigung wurde automatisch versendet.",
  },
  en: {
    subject: "Thanks for your message",
    greeting: (name) => `Hi ${name},`,
    lines: [
      "thank you for your message! It has reached me, and I will get back to you as soon as possible.",
    ],
    closing: "Best regards",
    note: "This confirmation was sent automatically.",
  },
};

const reply = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Strips control characters so a name can never break out of a mail header. */
const cleanName = (s) => s.replace(/[\u0000-\u001f\u007f<>"]/g, " ").replace(/\s+/g, " ").trim();

const normalizeLang = (lang) => (LANGS.includes(lang) ? lang : DEFAULT_LANG);

/**
 * Verifies the Turnstile token. Skipped (with a warning) while TURNSTILE_SECRET
 * is not configured, so the form keeps working until the widget is set up.
 */
async function verifyTurnstile(token, ip, env) {
  if (!env.TURNSTILE_SECRET) {
    console.warn("TURNSTILE_SECRET not set: bot check skipped");
    return true;
  }
  if (!token) return false;
  const body = new FormData();
  body.append("secret", env.TURNSTILE_SECRET);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch(TURNSTILE_URL, { method: "POST", body });
    return (await res.json()).success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err?.message);
    return false;
  }
}

const smtpConfig = (env) => ({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE !== "false",
  credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
  authType: "plain",
});

function ownerMail(env, name, email, message) {
  return {
    from: { name: "Website Kontakt", email: env.MAIL_FROM },
    to: env.MAIL_TO,
    reply: { name, email },
    subject: "Website Contact Form",
    html: `<strong>Name:</strong> ${escapeHtml(name)}<br>
<strong>Email:</strong> ${escapeHtml(email)}<br><br>
<strong>Message:</strong><br>${escapeHtml(message).replace(/\r?\n/g, "<br>")}`,
  };
}

/** Confirmation for the visitor; deliberately does not quote their message. */
function autoReplyMail(env, name, email, lang) {
  const t = AUTOREPLY[lang];
  const text = [t.greeting(name), "", ...t.lines, "", t.closing, "Viktor Wilhelm", "", t.note].join("\n");
  const html = `<p>${escapeHtml(t.greeting(name))}</p>
${t.lines.map((l) => `<p>${escapeHtml(l)}</p>`).join("\n")}
<p>${t.closing}<br>Viktor Wilhelm</p>
<p style="color:#777;font-size:12px">${t.note}</p>`;
  return {
    from: { name: "Viktor Wilhelm", email: env.MAIL_FROM },
    to: { name, email },
    reply: env.MAIL_TO,
    subject: t.subject,
    text,
    html,
    headers: { "Auto-Submitted": "auto-replied" },
  };
}

async function handleContact(request, env) {
  if (request.method !== "POST") return reply({ success: false, error: "Method not allowed" }, 405);

  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  if (env.RATE_LIMITER) {
    const { success } = await env.RATE_LIMITER.limit({ key: ip || "unknown" });
    if (!success) return reply({ success: false, error: "Too many requests" }, 429);
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return reply({ success: false, error: "Invalid JSON" }, 400);
  }

  const name = cleanName(String(data?.name ?? ""));
  const email = String(data?.email ?? "").trim();
  const message = String(data?.message ?? "").trim();
  const lang = normalizeLang(data?.lang);
  if (!name || !message || !EMAIL_RE.test(email) || name.length > 200 || email.length > 320 || message.length > 5000) {
    return reply({ success: false, error: "Invalid input data" }, 400);
  }

  if (!(await verifyTurnstile(data?.["cf-turnstile-response"], ip, env))) {
    return reply({ success: false, error: "Bot check failed" }, 403);
  }

  try {
    await WorkerMailer.send(smtpConfig(env), ownerMail(env, name, email, message));
  } catch (err) {
    console.error("SMTP send failed:", err?.message);
    return reply({ success: false, error: "Mail delivery failed" }, 500);
  }

  // The owner mail is already out; a failing confirmation must not turn this into an error.
  let autoreply = false;
  try {
    await WorkerMailer.send(smtpConfig(env), autoReplyMail(env, name, email, lang));
    autoreply = true;
  } catch (err) {
    console.error("Autoreply failed:", err?.message);
  }
  return reply({ success: true, autoreply });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
