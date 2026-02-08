import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import SkillBars from './SkillBars';

function Home() {
  const fullName = 'Connor Henderson';
  const [displayText, setDisplayText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullName.length) {
        setDisplayText(fullName.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setTypingDone(true), 400);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    window.print();
  };

  return (
    <section id="home" className="section home">
      <div className="container">
        <div className="home__content">
          <ScrollReveal delay={0}>
            <div className="terminal-line">
              <span className="prompt">$</span> cat about.txt
            </div>

            <div className="home__ascii-top">
              ╔{'═'.repeat(52)}╗
            </div>
          </ScrollReveal>

          <h1 className={`home__name ${typingDone ? 'glitch' : ''}`}>
            {displayText}
            <span className="cursor"></span>
          </h1>

          <ScrollReveal delay={200}>
            <p className="home__role">Software Engineer | DevOps Engineer | Cloud Infrastructure</p>
          </ScrollReveal>

          <div className="home__divider">
            ├{'─'.repeat(52)}┤
          </div>

          <ScrollReveal delay={300}>
            <div className="home__summary">
              <p>
                Junior Engineer experienced in designing, deploying, and automating
                multi-cloud infrastructure across AWS and Azure. Skilled in
                Infrastructure as Code, AI development, Software Development,
                CI/CD, Kubernetes, Terraform, and observability tooling. Focused on
                forward development, innovation, and advancing system performance
                and resilience.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="home__skills">
              <div className="terminal-line">
                <span className="prompt">$</span> cat tech_stack.conf
              </div>
              <SkillBars />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <div className="home__meta">
              <div className="home__meta-item">
                <span className="prompt">&gt;</span> location: <span className="home__meta-value">Middleborough, MA</span>
              </div>
              <div className="home__meta-item">
                <span className="prompt">&gt;</span> education: <span className="home__meta-value">B.S. Computer Science — Bridgewater State University, 2023</span>
              </div>
              <div className="home__meta-item">
                <span className="prompt">&gt;</span> certification: <span className="home__meta-value">DevOps Foundations: Infrastructure as Code — LinkedIn Learning</span>
              </div>
            </div>

            <div className="home__ascii-bottom">
              ╚{'═'.repeat(52)}╝
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="home__cta">
              <a href="#work" className="home__cta-link">
                [ VIEW_TIMELINE ]
              </a>
              <a href="#projects" className="home__cta-link">
                [ VIEW_PROJECTS ]
              </a>
              <a href="#contact" className="home__cta-link">
                [ CONTACT_ME ]
              </a>
              <button className="home__cta-link home__cta-link--download" onClick={handleDownload}>
                [ DOWNLOAD_PDF ]
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Home;
