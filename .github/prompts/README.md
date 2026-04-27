# Prompts – Portfolio-Website

Diese Prompts sind strukturierte Anweisungssätze für GitHub Copilot.

## Inhalt

| Datei | Beschreibung |
|-------|-------------|
| `copilot-project.prompt.md` | Haupt-Prompt mit allen Projektstandards |

## Verwendung

Diese Prompts werden automatisch von Copilot geladen, wenn du in diesem Workspace arbeitest.
Die Haupt-Konfiguration liegt in `.github/copilot-instructions.md`.

## Dokumentationsstruktur

```
.github/
├── copilot-instructions.md         # Haupt-Copilot-Konfiguration
├── ANPASSUNGEN.md                  # Änderungsprotokoll
├── prompts/
│   └── copilot-project.prompt.md  # Detaillierter Projekt-Prompt
├── agents/                         # Spezialisten-Agenten
│   ├── code-review/
│   ├── maintenance/
│   └── refactoring/
├── docs/
│   ├── architecture/               # Architektur, Coding-Rules, Agents
│   ├── development/                # Contributing, Git-Befehle
│   ├── project/                    # Projektdokumentation, Checkliste
│   └── jsdoc-generator.md         # JSDoc-Vorlagen
└── workflows/                      # Branch-Management, DoD
```
