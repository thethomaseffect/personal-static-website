import { useState, useEffect } from 'react';
import './WorkExperience.css';

function WorkExperience({ language }) {
  const [content, setContent] = useState(null);
  const [workData, setWorkData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/content.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}data/work-experience.json`).then(res => res.json())
    ])
      .then(([contentData, workData]) => {
        setContent(contentData);
        setWorkData(workData);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  if (!content || !workData) {
    return <div className="loading">Loading...</div>;
  }

  const text = content[language] || content.en;
  const experiences = workData.experiences || [];

  return (
    <div className="work-experience">
      <h1>{text.workExperience}</h1>
      <p className="description">{text.workExperienceDesc}</p>

      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-card">
            <div className="experience-header">
              <h2>{exp[language]?.title || exp.en?.title}</h2>
              <div className="experience-meta">
                {(exp[language]?.company || exp.en?.company) && (
                  <span className="company">{exp[language]?.company || exp.en?.company}</span>
                )}
                {exp.period && <span className="period">{exp.period}</span>}
              </div>
            </div>
            <div className="experience-content">
              {exp[language]?.description && (
                <p className="description-text">{exp[language].description}</p>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="technologies">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkExperience;

