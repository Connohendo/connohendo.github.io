# Connor Henderson — Resume Webapp

A single-page resume web application themed after the **AK-47 | Vulcan** skin from Counter-Strike 2. Monospace terminal aesthetic meets deep navy, cobalt blue, cyan highlights, and orange accents.

**Live:** [connohendo.github.io](https://connohendo.github.io)

## Features

- **Vulcan theme** — CS2-inspired color palette with geometric grid background, corner accents, and gradient borders
- **Dark/Light mode** — light blueprint mode and dark terminal mode (true Vulcan colors)
- **Scroll animations** — sections and cards fade/slide in as you scroll via IntersectionObserver
- **Glitch effect** — periodic text glitch on the hero name with cyan + orange shadows
- **Scrollable timeline** — work history, education, and certifications merged into a color-coded vertical timeline with pulsing dots
- **Four sections** — Home, Timeline, Projects, Contact
- **Contact form** — powered by [Formspree](https://formspree.io) (falls back to mailto if not configured)
- **Responsive** — works on desktop, tablet, and mobile
- **GitHub Pages ready** — auto-deploys via GitHub Actions on push to `master`

## Tech Stack

- **Frontend:** React 18, Vite, CSS3
- **Backend (local dev):** Node.js, Express
- **Deployment:** GitHub Pages via GitHub Actions
- **Contact form:** Formspree (static-compatible)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

If you have nvm installed:

```bash
nvm install 18
nvm use 18
```

### Installation

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies (optional, for local dev only)
cd ../server && npm install
```

### Development

```bash
# Run both client and server concurrently
npm run dev
```

- Client runs on `http://localhost:3000`
- Server runs on `http://localhost:5001`

### Production Build

```bash
cd client && npm run build
```

Static output is generated in `client/dist/`.

## Deployment (GitHub Pages)

Deployment is automated via GitHub Actions. Every push to `master` triggers a build and deploy.

### Setup

1. Push the repo to GitHub
2. Go to **Settings > Pages**
3. Under **Build and deployment > Source**, select **GitHub Actions**
4. Push to `master` — the site will deploy to `https://connohendo.github.io`

### Contact Form Setup

The contact form uses [Formspree](https://formspree.io) (free tier: 50 submissions/month):

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID (e.g. `xpzvqkdl`)
3. Open `client/src/components/Contact.jsx`
4. Replace `'YOUR_FORM_ID'` with your actual form ID
5. Commit and push — the form will work on the live site

Without Formspree configured, the form falls back to opening the user's email client via `mailto:`.

## Project Structure

```
├── .github/workflows/     # GitHub Actions deploy workflow
│   └── deploy.yml
├── client/                 # React frontend (Vite)
│   ├── public/
│   │   └── .nojekyll
│   ├── src/
│   │   ├── components/
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ScrollReveal.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── Timeline.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css          # Component styles
│   │   ├── index.css         # Global styles & Vulcan theme
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
├── server/                  # Express backend (local dev only)
│   └── index.js
├── package.json             # Root scripts (concurrently)
└── README.md
```

## Customization

- **Your info:** Edit the data arrays at the top of `Home.jsx`, `Timeline.jsx`, `Projects.jsx`, and `Contact.jsx`
- **Colors:** Modify CSS variables in `client/src/index.css` under `:root` (light) and `[data-theme='dark']` (dark)
- **Fonts:** Change the Google Fonts import in `index.css` and `index.html`
