# Resume Webapp — Printstream Aesthetic

A single-page resume web application with a printstream/terminal aesthetic, built with React.js and Node.js.

## Features

- **Printstream aesthetic** — monospace typography, terminal-style UI, scanline overlay
- **Dark/Light mode** — white paper (light) / green terminal (dark)
- **Four sections** — Home, Work History, Projects, Contact
- **Contact form** — powered by Express.js backend
- **Responsive** — works on desktop, tablet, and mobile

## Tech Stack

- **Frontend:** React 18, Vite, CSS3
- **Backend:** Node.js, Express

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Development

```bash
# Run both client and server concurrently
npm run dev
```

- Client runs on `http://localhost:3000`
- Server runs on `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Theme context
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css     # Global styles & theme
│   │   └── main.jsx
│   └── index.html
├── server/               # Express backend
│   └── index.js
└── package.json          # Root scripts
```
