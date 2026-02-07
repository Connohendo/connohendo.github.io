import Navbar from './components/Navbar';
import Home from './components/Home';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="bg-grid"></div>
      <Navbar />
      <main>
        <Home />
        <Timeline />
        <Projects />
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
