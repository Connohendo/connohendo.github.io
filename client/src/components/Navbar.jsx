import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'home', label: 'home' },
  { id: 'work', label: 'timeline' },
  { id: 'projects', label: 'projects' },
  { id: 'github', label: 'github' },
  { id: 'contact', label: 'contact' },
];

function Navbar({ onToggleTerminal }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [...NAV_ITEMS].reverse();
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for terminal: Ctrl + `
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        onToggleTerminal();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onToggleTerminal]);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={handleNavClick}>
          <span className="prompt">&gt;</span> C.Henderson
        </a>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
              onClick={handleNavClick}
            >
              /{label}
            </a>
          ))}

          <button
            className="navbar__terminal-btn"
            onClick={onToggleTerminal}
            aria-label="Toggle terminal"
            title="Open terminal (Ctrl + `)"
          >
            &gt;_
          </button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
