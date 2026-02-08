import { useEffect, useRef, useState } from 'react';

const SKILL_GROUPS = [
  {
    category: 'Cloud & Infrastructure',
    skills: [
      { name: 'AWS', level: 88 },
      { name: 'Azure', level: 82 },
      { name: 'Terraform', level: 78 },
      { name: 'Kubernetes', level: 80 },
      { name: 'Docker', level: 85 },
    ],
  },
  {
    category: 'Languages & Data',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'SQL', level: 80 },
      { name: 'Java', level: 68 },
      { name: 'Golang', level: 62 },
    ],
  },
  {
    category: 'DevOps & Tooling',
    skills: [
      { name: 'CI/CD', level: 86 },
      { name: 'Git / GitHub Actions', level: 85 },
      { name: 'Prometheus / Grafana', level: 74 },
      { name: 'ElasticSearch', level: 75 },
    ],
  },
];

function SkillBars() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className={`skill-bars ${visible ? 'skill-bars--visible' : ''}`}>
      {SKILL_GROUPS.map((group) => (
        <div key={group.category} className="skill-bars__group">
          <h4 className="skill-bars__category">
            <span className="prompt">&gt;</span> {group.category}
          </h4>
          <div className="skill-bars__list">
            {group.skills.map((skill, i) => (
              <div
                key={skill.name}
                className="skill-bar"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="skill-bar__label">
                  <span className="skill-bar__name">{skill.name}</span>
                  <span className="skill-bar__pct">{skill.level}%</span>
                </div>
                <div className="skill-bar__track">
                  <div
                    className="skill-bar__fill"
                    style={{ '--skill-level': `${skill.level}%` }}
                  >
                    <div className="skill-bar__stripes"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillBars;
