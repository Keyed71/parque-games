# Parque Games — Claude Code Guide

A classroom game portal for Cambridge School — Parque das Nações. Built with React + Vite + TypeScript + Tailwind. Deployed on Vercel via GitHub (`main` branch auto-deploys).

---

## Architecture

Games are registered in `src/games/index.ts` as `GameDefinition` objects:

```ts
{
  id: string          // URL slug and filename key
  title: string       // Hub card title
  description: string // Hub card subtitle
  icon: string        // '/image.png' (public/) or emoji fallback
  dataUrl?: string    // Published Google Sheet CSV URL
  component: ComponentType<GameProps>  // React component
}
```

`GameLoader.tsx` handles routing (`/:gameId`), fetches the CSV from `dataUrl` if present, and passes `data: string[][]` + `onExit` to the component.

Games that are complex standalone experiences (like Jeopardy) live as HTML files in `public/games/` and are launched inside a fullscreen iframe by their React wrapper.

---

## Hub visual style

- Background: `#fdf6ec` (warm cream)
- Header: `linear-gradient(150deg, #7a2e1a, #c4592a, #d4845a)` terracotta
- Font: `'Nunito'` + `'Dancing Script'` (Google Fonts, loaded in `index.html`)
- Cards: white, `border: 1px solid #e8d0b0`, `border-radius: 20px`

Match this palette on any selector/lobby screen built inside a React component.

---

## Adding a new Jeopardy game

### Step 1 — Create the HTML file

Copy the bright & light template from any existing file in `public/games/`. Key conventions:

- **Filename**: `{id}.html` where `id` is lowercase-kebab-case matching the catalogue row
- **CSS**: Do not change — the design is intentional for whiteboard projection
  - Background: `#eef2ff` (light indigo)
  - Board cells: `#2563eb` bright blue, white text
  - Modal question: `font-size: 1.5rem`, dark on `#f8faff`
  - Answer text: `font-size: 1.3rem`, `color: #14532d` on `#f0fdf4`
- **`gameData`**: Replace with the new questions. Structure:

```js
const gameData = [
  {
    id: 'A',           // Single letter, shown on board header
    name: 'Category Name',
    questions: [
      {
        value: 100,    // 100 / 200 / 300 / 400 / 500
        prompt: 'The question text shown to students.',
        // Optional — only for Multiple Choice categories:
        options: ['A)  option', 'B)  option', 'C)  option', 'D)  option'],
        answer: 'The answer + any explanation for the teacher.',
      },
      // ... 5 questions per category
    ]
  },
  // ... up to 7 categories (board auto-adjusts columns)
]
```

- The game title strings appear in three places — update all three:
  1. `<title>` tag
  2. `.setup-subtitle` div
  3. `.game-title` div

### Step 2 — Add a row to the Google Sheet catalogue

Sheet: **"Parque Games — Jeopardy Catalogue"** (Google Drive)  
Live CSV URL wired into the portal:
```
https://docs.google.com/spreadsheets/d/e/2PACX-1vRMZ-VR-OyW5gsYtSvVE3hNYjZlJFhe7QP0ue0V4IxSbgQKMOvPCYIkSLSn1y4d04gYmagwbcroJJKw/pub?gid=2045134284&single=true&output=csv
```

Columns (in order):

| Column | Notes |
|---|---|
| `id` | Must match the HTML filename without `.html` |
| `title` | Display name on the selector card |
| `level` | One of: A1 A2 B1 B2 C1 C2 |
| `theme` | e.g. Grammar / FCE Exam Prep / Vocabulary / Christmas |
| `description` | One sentence shown on the selector card |
| `categories` | Comma-separated list of category names |
| `created_by` | Teacher's name |

Use the Google Drive MCP tool (`mcp__claude_ai_Google_Drive__*`) to update the sheet programmatically, or instruct the user to add the row manually.

### Step 3 — Commit and push

```bash
git add public/games/{id}.html
git commit -m "Add {title} Jeopardy game ({level})"
git push origin main
```

Vercel auto-deploys from `main`. The new game appears in the portal selector immediately after deploy — no code changes needed.

---

## Adding a different type of game (non-Jeopardy)

1. Create `src/games/{id}/` with a React component matching `GameProps`
2. If it needs question data, point `dataUrl` at a published Google Sheet CSV
3. Register in `src/games/index.ts`
4. Add an image to `public/` for the hub card (`icon: '/{id}.png'`)

---

## Existing games

| Game | Type | Level | Notes |
|---|---|---|---|
| Herd Mentality | React component | Any | Questions from Google Sheet via `dataUrl` |
| Noughts & Crosses | React + HTML iframe | Any | `public/games/noughts-crosses.html`; grammar CSV; bg music |
| 3 in a Row | React + HTML iframe | Any | `public/games/three-in-a-row.html`; 4×4/5×5, 2–4 teams, line scoring; same grammar CSV |
| FCE Jeopardy | HTML iframe | B2 | `public/games/fce-jeopardy.html` |
| Grammar Jeopardy — Final Review | HTML iframe | B1 | `public/games/grammar-jeopardy-b1.html` |
| Grammar Jeopardy — Level 6 (B2) | HTML iframe | B2 | `public/games/grammar-jeopardy-b2.html` |

---

## Deployment

- GitHub repo: `Keyed71/parque-games`
- Branch: `main` — every push triggers a Vercel deploy
- Always build-check before pushing: `npm run build`
- Never use `--no-verify` or force-push to `main`
