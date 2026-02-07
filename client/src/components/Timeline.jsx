import ScrollReveal from './ScrollReveal';

/* Newest → oldest */
const TIMELINE_ENTRIES = [
  {
    id: 4,
    type: 'certification',
    title: 'DevOps Foundations: Infrastructure as Code',
    organization: 'LinkedIn Learning',
    period: 'Dec 2025',
    current: false,
    description: [],
    tech: ['DevOps', 'Infrastructure as Code'],
  },
  {
    id: 3,
    type: 'work',
    title: 'Junior Developer',
    organization: 'Tekletics',
    period: 'Dec 2023 — Present',
    current: true,
    description: [
      'Migrated legacy data warehouse infrastructure to AWS S3 and Redshift using Python automation, improving processing speed by 45%',
      'Designed and deployed serverless ETL workflows using AWS Lambda and event-driven ingestion',
      'Engineered multi-cloud compute/storage environments on Azure, integrating ElasticSearch and AssemblyAI',
      'Developed and delivered AI-powered software solutions to modernize workflows for multiple customers',
      'Implemented CI/CD and observability improvements, reducing deployment time',
      'Collaborated with DevOps teams to ensure high uptime and proactive issue resolution',
    ],
    tech: ['AWS', 'Azure', 'Python', 'Redshift', 'Lambda', 'ElasticSearch', 'CI/CD'],
  },
  {
    id: 2,
    type: 'work',
    title: 'DevSecOps Engineer',
    organization: 'General Dynamics Mission Systems',
    period: 'May 2022 — May 2023',
    current: false,
    description: [
      'Maintained and hardened containerized applications for security compliance',
      'Created automated CI/CD pipelines for Kubernetes clusters with ISTIO routing',
      'Implemented Prometheus-based alerting for real-time failure detection',
      'Automated vulnerability data collection via Prisma API integrations',
      'Participated in incident response rotations improving system resilience',
    ],
    tech: ['Kubernetes', 'Docker', 'Prometheus', 'ISTIO', 'CI/CD', 'Prisma'],
  },
  {
    id: 1,
    type: 'education',
    title: 'Bachelor of Science in Computer Science',
    organization: 'Bridgewater State University',
    period: '2019 — 2023',
    current: false,
    description: [],
    tech: [],
  },
];

function Timeline() {
  return (
    <section id="work" className="section timeline">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Timeline</h2>
            <div className="terminal-line">
              <span className="prompt">$</span> git log --oneline --all
            </div>
          </div>
        </ScrollReveal>

        <div className="timeline__track">
          {TIMELINE_ENTRIES.map((entry, index) => (
            <ScrollReveal key={entry.id} delay={index * 120} direction="right">
              <div className="timeline__entry">
                <div
                  className={`timeline__dot timeline__dot--${entry.type} ${
                    entry.current ? 'timeline__dot--current' : ''
                  }`}
                />

                <div className={`timeline__card timeline__card--${entry.type}`}>
                  <div className="timeline__card-stripes"></div>
                  <div className="timeline__card-inner">
                    <span className={`timeline__type-badge timeline__type-badge--${entry.type}`}>
                      {entry.type}
                    </span>

                    <h3 className="timeline__entry-title">{entry.title}</h3>

                    <div className="timeline__entry-meta">
                      <span className="timeline__entry-org">@ {entry.organization}</span>
                      <span className="timeline__entry-period">[{entry.period}]</span>
                    </div>

                    {entry.description.length > 0 && (
                      <ul className="timeline__description">
                        {entry.description.map((item, i) => (
                          <li key={i} className="timeline__description-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.tech.length > 0 && (
                      <div className="timeline__tech">
                        {entry.tech.map((t) => (
                          <span key={t} className="timeline__tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="timeline__footer">
            <span className="prompt">&gt;&gt;&gt;</span> {TIMELINE_ENTRIES.length} commits loaded
            {' · '}
            <span style={{ color: 'var(--accent)' }}>●</span> work{' · '}
            <span style={{ color: 'var(--accent-secondary)' }}>●</span> education{' · '}
            <span style={{ color: 'var(--highlight)' }}>●</span> certification
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Timeline;
