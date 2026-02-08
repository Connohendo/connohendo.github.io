import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const GITHUB_USERNAME = 'Connohendo';
const CACHE_KEY = 'github_stats_cache';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  async function fetchGitHubData() {
    // Check cache
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          setProfile(data.profile);
          setRepos(data.repos);
          setLanguages(data.languages);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      // cache miss, continue
    }

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner`
        ),
      ]);

      if (!profileRes.ok || !reposRes.ok) {
        throw new Error('GitHub API request failed');
      }

      const profileData = await profileRes.json();
      const reposData = await reposRes.json();

      // Calculate language breakdown
      const langCount = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });

      // Sort by count
      const sortedLangs = Object.entries(langCount)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [lang, count]) => {
          acc[lang] = count;
          return acc;
        }, {});

      // Top repos (by stars, then by recent update)
      const topRepos = [...reposData]
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6);

      // Cache
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: { profile: profileData, repos: topRepos, languages: sortedLangs },
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        // storage full, ignore
      }

      setProfile(profileData);
      setRepos(topRepos);
      setLanguages(sortedLangs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalLangRepos = Object.values(languages).reduce((a, b) => a + b, 0);

  return (
    <section id="github" className="section github-stats">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">GitHub</h2>
            <div className="terminal-line">
              <span className="prompt">$</span> gh api /users/{GITHUB_USERNAME}
            </div>
          </div>
        </ScrollReveal>

        {loading && (
          <div className="github-stats__loading">
            <span className="prompt">&gt;&gt;&gt;</span> Fetching from GitHub API...
          </div>
        )}

        {error && (
          <div className="github-stats__error">
            <span className="prompt">&gt;&gt;&gt;</span> ERROR: {error}
            <br />
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              [ VIEW_PROFILE_ON_GITHUB ]
            </a>
          </div>
        )}

        {!loading && !error && profile && (
          <>
            {/* Profile overview */}
            <ScrollReveal delay={100}>
              <div className="github-stats__profile">
                <div className="github-stats__profile-card">
                  <div className="github-stats__avatar-wrap">
                    <img
                      src={profile.avatar_url}
                      alt={profile.login}
                      className="github-stats__avatar"
                    />
                  </div>
                  <div className="github-stats__profile-info">
                    <h3 className="github-stats__username">
                      <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{profile.login}
                      </a>
                    </h3>
                    {profile.bio && (
                      <p className="github-stats__bio">{profile.bio}</p>
                    )}
                    <div className="github-stats__counters">
                      <div className="github-stats__counter">
                        <span className="github-stats__counter-value">
                          {profile.public_repos}
                        </span>
                        <span className="github-stats__counter-label">repos</span>
                      </div>
                      <div className="github-stats__counter">
                        <span className="github-stats__counter-value">
                          {profile.followers}
                        </span>
                        <span className="github-stats__counter-label">followers</span>
                      </div>
                      <div className="github-stats__counter">
                        <span className="github-stats__counter-value">
                          {profile.following}
                        </span>
                        <span className="github-stats__counter-label">following</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Language breakdown */}
            {Object.keys(languages).length > 0 && (
              <ScrollReveal delay={200}>
                <div className="github-stats__languages">
                  <div className="terminal-line">
                    <span className="prompt">$</span> cat languages.conf
                  </div>
                  <div className="github-stats__lang-bars">
                    {Object.entries(languages).map(([lang, count]) => {
                      const pct = Math.round((count / totalLangRepos) * 100);
                      return (
                        <div key={lang} className="github-stats__lang-row">
                          <span className="github-stats__lang-name">{lang}</span>
                          <div className="github-stats__lang-track">
                            <div
                              className="github-stats__lang-fill"
                              style={{ '--lang-pct': `${pct}%` }}
                            ></div>
                          </div>
                          <span className="github-stats__lang-pct">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Top repos */}
            {repos.length > 0 && (
              <ScrollReveal delay={300}>
                <div className="github-stats__repos">
                  <div className="terminal-line">
                    <span className="prompt">$</span> gh repo list --limit 6
                  </div>
                  <div className="github-stats__repos-grid">
                    {repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-stats__repo-card"
                      >
                        <div className="github-stats__repo-card-stripes"></div>
                        <div className="github-stats__repo-name">{repo.name}</div>
                        {repo.description && (
                          <p className="github-stats__repo-desc">
                            {repo.description.length > 80
                              ? repo.description.substring(0, 80) + '...'
                              : repo.description}
                          </p>
                        )}
                        <div className="github-stats__repo-meta">
                          {repo.language && (
                            <span className="github-stats__repo-lang">
                              ● {repo.language}
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span className="github-stats__repo-stars">
                              ★ {repo.stargazers_count}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={400}>
              <div className="github-stats__footer">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-stats__view-all"
                >
                  [ VIEW_FULL_PROFILE ]
                </a>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}

export default GitHubStats;
