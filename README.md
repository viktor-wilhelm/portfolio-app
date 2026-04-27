# Portfolio Website

A professional, bilingual (DE/EN) developer portfolio website built as a one-page application.

---

## Design Preview

![About Me Section](docs/design-preview.png)

> **Note:** Save the screenshot as `docs/design-preview.png` and commit it for the image to appear on GitHub.

---

## Tech Stack

| Area        | Technology                    |
| ----------- | ----------------------------- |
| Markup      | HTML5 (semantic, accessible)  |
| Styling     | CSS3 (Custom Properties, BEM) |
| Logic       | Vanilla JavaScript (ES6+)     |
| i18n        | Custom language switcher      |
| Persistence | localStorage                  |
| Backend     | PHP (`mail.php`)              |
| Build tool  | None                          |

---

## Project Structure

```
portfolio-app/
├── index.html              # One-page – all sections
├── mail.php                # Contact form backend
├── assets/
│   ├── fonts/              # Locally hosted fonts
│   ├── img/                # Images (max. 500 KB each)
│   └── icons/              # SVG icons & favicon
├── css/
│   ├── variables.css       # CSS Custom Properties
│   ├── base.css            # Reset & global styles
│   ├── components/         # navbar.css, footer.css, ...
│   └── sections/           # hero.css, about.css, projects.css, contact.css
└── js/
    ├── translations.js     # Translation objects (de / en)
    ├── language.js         # Language switcher + localStorage
    └── contact-form.js     # onBlur validation & form submission
```

---

## Local Development

**Requirements:** VS Code + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

```bash
# Clone the repository
git clone https://github.com/viktor-wilhelm/portfolio-app.git
cd portfolio-app

# Start Live Server
# index.html → right-click → "Open with Live Server"
# or:
python3 -m http.server 8000
```

Open in browser: `http://localhost:5500`

---

## Sections

| Section  | ID          | Description                                |
| -------- | ----------- | ------------------------------------------ |
| Header   | –           | Navigation + language switcher (DE \| EN)  |
| Hero     | `#hero`     | Fullscreen (100vh) – name, title, CTA      |
| About    | `#about`    | Photo, bio, skills                         |
| Projects | `#projects` | Project cards with live link + GitHub link |
| Contact  | `#contact`  | Form with onBlur validation                |
| Footer   | –           | Social links, imprint, privacy policy      |

---

## Adding Translations

Add new keys to `js/translations.js`:

```js
const translations = {
  de: { myKey: 'Mein Text' },
  en: { myKey: 'My text' },
};
```

Reference in HTML with `data-i18n="myKey"`:

```html
<p data-i18n="myKey">My text</p>
```

---

## Git Workflow

```bash
git checkout -b feature/section-name
# ... develop ...
git add .
git commit -m "Add hero section with 100vh layout"
git checkout dev
git merge feature/section-name
```

---

## Documentation

Further documentation is located in [`docs/manual/`](docs/manual/).
