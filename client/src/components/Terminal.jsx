import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const WELCOME = [
  '╔═══════════════════════════════════════════════════╗',
  '║  Connor Henderson — Interactive Terminal          ║',
  '║  Type "help" for available commands               ║',
  '╚═══════════════════════════════════════════════════╝',
  '',
];

const SECTIONS = ['home', 'work', 'projects', 'github', 'contact'];

function buildCommands(toggleTheme) {
  return {
    help: () => [
      'Available commands:',
      '',
      '  about          Display professional summary',
      '  skills         List technical skills',
      '  experience     Show work history',
      '  projects       List key projects',
      '  education      Show education info',
      '  certs          Show certifications',
      '  contact        Show contact info',
      '  resume         Download resume as PDF',
      '  goto <section> Scroll to section',
      '  ls             List page sections',
      '  theme          Toggle dark/light mode',
      '  whoami         Who am I?',
      '  date           Current date & time',
      '  pwd            Print working directory',
      '  neofetch       System info',
      '  echo <text>    Repeat text',
      '  history        Command history',
      '  clear          Clear terminal',
      '',
      'Sections: ' + SECTIONS.join(', '),
    ],

    about: () => [
      'Connor Henderson',
      'Software Engineer | DevOps Engineer | Cloud Infrastructure',
      '',
      'Junior Engineer experienced in designing, deploying, and automating',
      'multi-cloud infrastructure across AWS and Azure. Skilled in',
      'Infrastructure as Code, AI development, Software Development,',
      'CI/CD, Kubernetes, Terraform, and observability tooling.',
      '',
      'Location:  Middleborough, MA',
      'Status:    Open to opportunities',
    ],

    skills: () => [
      '┌─ Technical Skills ─────────────────────────────────┐',
      '│                                                     │',
      '│  Cloud:      AWS, Microsoft Azure                   │',
      '│  Infra:      Terraform, Kubernetes, Docker, CI/CD   │',
      '│  Languages:  Python, Java, Golang, SQL              │',
      '│  Observe:    Prometheus, Grafana                     │',
      '│  Databases:  ElasticSearch, Redshift, Azure SQL     │',
      '│  DevOps:     Git, Linux, GitHub Actions, Jenkins    │',
      '│                                                     │',
      '└─────────────────────────────────────────────────────┘',
    ],

    experience: () => [
      '── Junior Developer @ Tekletics [Dec 2023 — Present] ──',
      '  • Migrated legacy data warehouse to AWS S3 + Redshift (+45% speed)',
      '  • Deployed serverless ETL workflows with AWS Lambda',
      '  • Engineered multi-cloud environments on Azure',
      '  • Delivered AI-powered software solutions',
      '  • Implemented CI/CD and observability improvements',
      '',
      '── DevSecOps Engineer @ General Dynamics [May 2022 — May 2023] ──',
      '  • Hardened containerized apps for security compliance',
      '  • Created CI/CD pipelines for K8s clusters with ISTIO',
      '  • Implemented Prometheus alerting for failure detection',
      '  • Automated vulnerability collection via Prisma API',
      '  • Participated in incident response rotations',
    ],

    projects: () => [
      '[00] Azure Function ETL Automation',
      '     Timer Triggers + Blob Storage for multi-warehouse API ingestion',
      '     Tech: Azure Functions, Blob Storage, Python',
      '',
      '[01] AI-Powered Audio Transcription System',
      '     Blob Storage + AssemblyAI + ElasticSearch in Flask Azure Function',
      '     Tech: AssemblyAI, ElasticSearch, Flask, Python',
      '',
      '[02] SQL Data Metrics Generator',
      '     SQLAlchemy + Pandas pipelines for daily deltas & summary metrics',
      '     Tech: SQLAlchemy, Pandas, Azure SQL, Python',
    ],

    education: () => [
      'Bachelor of Science in Computer Science',
      '  Bridgewater State University',
      '  Graduated 2023',
    ],

    certs: () => [
      'DevOps Foundations: Infrastructure as Code',
      '  LinkedIn Learning — Dec 2025',
      '  Skills: DevOps, Infrastructure as Code (IaC)',
    ],

    contact: () => [
      '┌─ Contact ──────────────────────────────────────────┐',
      '│  Phone:    (508) 277-9898                           │',
      '│  Email:    connorhenderson20@gmail.com              │',
      '│  GitHub:   github.com/Connohendo                    │',
      '│  LinkedIn: linkedin.com/in/connor-henderson         │',
      '│  Web:      connohendo.github.io                     │',
      '└────────────────────────────────────────────────────┘',
    ],

    resume: () => {
      setTimeout(() => window.print(), 300);
      return ['Opening print dialog... Save as PDF to download.'];
    },

    goto: (args) => {
      const target = args[0]?.toLowerCase();
      if (!target) return ['Usage: goto <section>', 'Sections: ' + SECTIONS.join(', ')];
      const id = target === 'timeline' ? 'work' : target;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return [`Navigating to ${target}...`];
      }
      return [`Section "${target}" not found. Try: ${SECTIONS.join(', ')}`];
    },

    ls: () => ['home/', 'timeline/', 'projects/', 'github/', 'contact/'],

    theme: () => {
      toggleTheme();
      return ['Theme toggled.'];
    },

    whoami: () => ['Connor Henderson — Software Engineer'],

    date: () => [new Date().toString()],

    pwd: () => ['/home/connor/resume'],

    echo: (args) => [args.join(' ') || ''],

    neofetch: () => [
      '       ╭──────────╮     connor@portfolio',
      '       │  ╱╲  ╱╲  │     ─────────────────',
      '       │ ╱  ╲╱  ╲ │     OS:     Web/React 18',
      '       │╱   Vulcan ╲│     Host:   connohendo.github.io',
      '       │╲   Theme  ╱│     Shell:  Interactive Terminal v1.0',
      '       │ ╲  ╱╲  ╱ │     Theme:  AK-47 | Vulcan',
      '       │  ╲╱  ╲╱  │     Stack:  React, Vite, Node.js',
      '       ╰──────────╯     Lang:   Python, Java, Go, SQL',
    ],

    // Easter eggs
    sudo: () => ['Nice try. Permission denied.'],
    'rm': () => ['I appreciate the enthusiasm, but no.'],
    exit: () => ['Close the terminal with Esc or the X button.'],
    hack: () => ['ACCESS GRANTED... just kidding.'],
    hello: () => ['Hey there! Welcome to my portfolio.'],
    hi: () => ['Hey there! Welcome to my portfolio.'],
    coffee: () => [
      '    ( (',
      '     ) )',
      '  .______.',
      '  |      |]',
      '  \\      /',
      '   `----\'',
      '',
      'Here\'s your coffee. Now get back to hiring me.',
    ],
    matrix: () => [
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      '',
      '(Just kidding. Check out my projects instead.)',
    ],
  };
}

function Terminal({ isOpen, onClose }) {
  const { toggleTheme } = useTheme();
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const commands = useRef(buildCommands(toggleTheme));

  // Update commands ref when toggleTheme changes
  useEffect(() => {
    commands.current = buildCommands(toggleTheme);
  }, [toggleTheme]);

  // Show welcome on first open
  const hasOpened = useRef(false);
  useEffect(() => {
    if (isOpen && !hasOpened.current) {
      hasOpened.current = true;
      setLines(WELCOME.map((content) => ({ type: 'system', content })));
    }
  }, [isOpen]);

  // Focus input when open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const processCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      // Add to history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);

      // Input line
      const newLines = [{ type: 'input', content: `$ ${trimmed}` }];

      if (cmd === 'clear') {
        setLines([]);
        return;
      }

      if (cmd === 'history') {
        const historyOutput = history.map((h, i) => `  ${i + 1}  ${h}`);
        historyOutput.push(`  ${history.length + 1}  ${trimmed}`);
        newLines.push(...historyOutput.map((content) => ({ type: 'output', content })));
        setLines((prev) => [...prev, ...newLines]);
        return;
      }

      const handler = commands.current[cmd];
      if (handler) {
        const output = typeof handler === 'function' ? handler(args) : handler;
        if (Array.isArray(output)) {
          newLines.push(...output.map((content) => ({ type: 'output', content })));
        }
      } else {
        newLines.push({
          type: 'error',
          content: `command not found: ${cmd}. Type "help" for available commands.`,
        });
      }

      setLines((prev) => [...prev, ...newLines]);
    },
    [history]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= history.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal" onClick={(e) => e.stopPropagation()}>
        <div className="terminal__header">
          <div className="terminal__dots">
            <span className="terminal__dot terminal__dot--red" onClick={onClose}></span>
            <span className="terminal__dot terminal__dot--yellow"></span>
            <span className="terminal__dot terminal__dot--green"></span>
          </div>
          <span className="terminal__title">connor@portfolio: ~</span>
          <button className="terminal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="terminal__output" ref={outputRef}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={`terminal__line terminal__line--${line.type}`}
            >
              {line.content}
            </div>
          ))}
        </div>

        <form className="terminal__input-row" onSubmit={handleSubmit}>
          <span className="terminal__prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command..."
          />
        </form>
      </div>
    </div>
  );
}

export default Terminal;
