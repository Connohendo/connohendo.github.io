import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Terminal from './components/Terminal';
import './App.css';

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  const toggleTerminal = useCallback(() => {
    setTerminalOpen((prev) => !prev);
  }, []);

  const closeTerminal = useCallback(() => {
    setTerminalOpen(false);
  }, []);

  return (
    <div className="app">
      <div className="bg-grid"></div>
      <Navbar onToggleTerminal={toggleTerminal} />
      <Terminal isOpen={terminalOpen} onClose={closeTerminal} />
      <main>
        <Home />
        <Timeline />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__divider"></div>
          <p className="footer__text">
            <span className="prompt">&gt;&gt;&gt;</span> process.exit(0)
          </p>
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Connor Henderson. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
