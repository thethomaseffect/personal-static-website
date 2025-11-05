import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ language }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/content.json`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  if (!content) {
    return <div className="loading">Loading...</div>;
  }

  const text = content[language] || content.en;
  const socials = content.socials || [];

  return (
    <div className="home">
      <div className="hero">
        <h1>{text.heroTitle}</h1>
        <p className="subtitle">{text.heroSubtitle}</p>
      </div>

      <section className="socials-section">
        <h2>{text.socialLinks}</h2>
        <div className="socials-grid">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <div className="social-icon">{social.icon || '🔗'}</div>
              <div className="social-name">{social.name}</div>
              {social.username && (
                <div className="social-username">@{social.username}</div>
              )}
            </a>
          ))}
        </div>
      </section>

      <section className="sections-overview">
        <h2>{text.exploreSections}</h2>
        <div className="sections-grid">
          <Link to="/work" className="section-card">
            <h3>{text.workExperience}</h3>
            <p>{text.workExperienceDesc}</p>
          </Link>
          <Link to="/projects" className="section-card">
            <h3>{text.programmingProjects}</h3>
            <p>{text.programmingProjectsDesc}</p>
          </Link>
          <Link to="/creative" className="section-card">
            <h3>{text.creativeWorks}</h3>
            <p>{text.creativeWorksDesc}</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

