import ScrollReveal from './ScrollReveal';

const PROJECTS = [
  {
    id: 1,
    name: 'Azure Function ETL Automation',
    description:
      'Built Azure Functions with Timer Triggers and Blob Storage for multi-warehouse API ingestion with queue continuation. Automated data pipeline processing across multiple sources.',
    tech: ['Azure Functions', 'Blob Storage', 'Timer Triggers', 'Python'],
    link: null,
    github: null,
  },
  {
    id: 2,
    name: 'AI-Powered Audio Transcription System',
    description:
      'Integrated Blob Storage + AssemblyAI + ElasticSearch in a Flask-based Azure Function for automated transcription and indexed retrieval. End-to-end audio processing pipeline.',
    tech: ['Azure Functions', 'AssemblyAI', 'ElasticSearch', 'Flask', 'Python'],
    link: null,
    github: null,
  },
  {
    id: 3,
    name: 'SQL Data Metrics Generator',
    description:
      'Built SQLAlchemy + Pandas pipelines computing daily deltas and loading summary metrics into Azure SQL. Automated reporting and data quality monitoring.',
    tech: ['SQLAlchemy', 'Pandas', 'Azure SQL', 'Python'],
    link: null,
    github: null,
  },
];

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <div className="terminal-line">
              <span className="prompt">$</span> ls -la ~/projects/
            </div>
          </div>
        </ScrollReveal>

        <div className="projects__grid">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 150}>
              <div className="projects__card">
                <div className="projects__card-stripes"></div>
                <div className="projects__card-header">
                  <span className="projects__card-index">
                    [{String(index).padStart(2, '0')}]
                  </span>
                  <h3 className="projects__card-name">{project.name}</h3>
                </div>

                <p className="projects__card-desc">{project.description}</p>

                <div className="projects__card-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="projects__tech-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="projects__card-links">
                  {project.github && (
                    <a
                      href={project.github}
                      className="projects__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [ SOURCE ]
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      className="projects__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      [ LIVE ]
                    </a>
                  )}
                  {!project.github && !project.link && (
                    <span className="projects__link projects__link--muted">
                      [ PRIVATE ]
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="projects__footer">
            <span className="prompt">&gt;&gt;&gt;</span> {PROJECTS.length} items listed
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Projects;
