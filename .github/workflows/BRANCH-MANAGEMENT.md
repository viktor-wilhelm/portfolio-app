# Branch Management – Portfolio-Website

## Branch-Strategie

Da die Portfolio-Website ein Einzelentwicklerprojekt ist, ist eine einfache Branch-Strategie sinnvoll:

```
main                    # Produktionsbranch (Live-Domain / Abgabe)
  └── dev               # Entwicklungsbranch
        └── feature/    # Feature-Branches (optional)
```

## Branches

### `main`

- Immer deploybar (live unter eigener Domain)
- Nur durch Merge aus `dev` befüllen
- Keine direkten Commits
- SSL muss aktiv sein (HTTPS erzwungen)

### `dev`

- Aktiver Entwicklungsbranch
- Nach jeder Coding-Session committen
- Vor Abgabe in `main` mergen

### Feature-Branches (Optional)

Für größere Teilbereiche:

```bash
git checkout -b feature/contact-form
git checkout -b feature/language-toggle
git checkout -b feature/projects-section
```

## Typischer Workflow

```bash
# 1. Auf dev arbeiten
git checkout dev

# 2. Nach Coding-Session committen
git add .
git commit -m "Add contact form with onBlur validation"
git push origin dev

# 3. Vor Abgabe: dev in main mergen
git checkout main
git merge dev
git push origin main
```

## Commit-Message Konventionen

```
Add hero section with 100vh layout
Fix image distortion in about section
Implement DE/EN language toggle
Add projects section with live and GitHub links
Fix webkit autofill background color
Add impressum and privacy policy to footer
```

- Englisch
- Imperativ (Add, Fix, Implement, Refactor, Remove)
- Klar und beschreibend
- Kein Emoji
- Max. 72 Zeichen
