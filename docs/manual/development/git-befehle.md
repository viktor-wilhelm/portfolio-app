# Git Befehle – Portfolio-Website

## Alltägliche Befehle

```bash
# Status anzeigen
git status

# Alle Änderungen stagen
git add .

# Einzelne Datei stagen
git add js/contact-form.js

# Commit erstellen
git commit -m "Add contact form onBlur validation"

# Auf GitHub pushen
git push origin dev
```

## Branch-Verwaltung

```bash
# Aktuellen Branch anzeigen
git branch

# Neuen Branch erstellen und wechseln
git checkout -b feature/contact-form

# Branch wechseln
git checkout dev

# Branch in dev mergen
git checkout dev
git merge feature/contact-form

# Branch löschen (nach Merge)
git branch -d feature/contact-form
```

## Dev → Main mergen (vor Abgabe)

```bash
# Sicherstellen dass dev aktuell ist
git checkout dev
git pull origin dev

# Nach main wechseln und mergen
git checkout main
git merge dev
git push origin main
```

## Logs & Historie

```bash
# Kompakte Commit-Historie
git log --oneline

# Letzte 10 Commits
git log --oneline -10

# Änderungen eines Commits anzeigen
git show <commit-hash>
```

## Rückgängig machen

```bash
# Unstaged Änderungen einer Datei rückgängig
git checkout -- <datei>

# Letzten Commit rückgängig (Änderungen behalten)
git reset HEAD~1

# Alle unstaged Änderungen verwerfen (VORSICHT!)
git checkout -- .
```

## Beispiel Commit-Messages (Portfolio)

```bash
git commit -m "Add hero section with 100vh layout"
git commit -m "Implement DE/EN language toggle"
git commit -m "Add contact form with onBlur validation"
git commit -m "Fix image distortion in about section"
git commit -m "Add projects section with live and GitHub links"
git commit -m "Add impressum and privacy policy to footer"
git commit -m "Compress project preview images below 500KB"
git commit -m "Fix webkit autofill background color"
```
