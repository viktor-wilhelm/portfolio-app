import { WorkerMailer } from "worker-mailer";

const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function handleContact(request, env) {
  if (request.method !== "POST") return reply({ success: false, error: "Method not allowed" }, 405);

  let data;
  try {
    data = await request.json();
  } catch {
    return reply({ success: false, error: "Invalid JSON" }, 400);
  }

  const name = String(data?.name ?? "").trim();
  const email = String(data?.email ?? "").trim();
  const message = String(data?.message ?? "").trim();
  if (!name || !message || !EMAIL_RE.test(email) || name.length > 200 || email.length > 320 || message.length > 5000) {
    return reply({ success: false, error: "Invalid input data" }, 400);
  }

  const html = `<strong>Name:</strong> ${escapeHtml(name)}<br>
<strong>Email:</strong> ${escapeHtml(email)}<br><br>
<strong>Message:</strong><br>${escapeHtml(message).replace(/\r?\n/g, "<br>")}`;

  try {
    await WorkerMailer.send(
      {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: true,
        credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
        authType: "plain",
      },
      {
        from: { name: "Website Kontakt", email: env.MAIL_FROM },
        to: env.MAIL_TO,
        reply: { name, email },
        subject: "Website Contact Form",
        html,
      },
    );
    return reply({ success: true });
  } catch (err) {
    console.error("SMTP send failed:", err?.message);
    return reply({ success: false, error: "Mail delivery failed" }, 500);
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
