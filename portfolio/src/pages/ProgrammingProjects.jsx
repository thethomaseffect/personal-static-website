import { useState, useEffect } from 'react';
import './ProgrammingProjects.css';

function ProgrammingProjects({ language }) {
  const [content, setContent] = useState(null);
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/content.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}data/programming-projects.json`).then(res => res.json())
    ])
      .then(([contentData, projectsData]) => {
        setContent(contentData);
        setProjectsData(projectsData);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  if (!content || !projectsData) {
    return <div className="loading">Loading...</div>;
  }

  const text = content[language] || content.en;
  const projects = projectsData.projects || [];

  return (
    <div className="programming-projects">
      <h1>{text.programmingProjects}</h1>
      <p className="description">{text.programmingProjectsDesc}</p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {project.image && (
              <div className="project-image">
                <img src={project.image} alt={project[language]?.title || project.en?.title} />
              </div>
            )}
            <div className="project-content">
              <h2>{project[language]?.title || project.en?.title}</h2>
              {project[language]?.description && (
                <p className="project-description">{project[language].description}</p>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <div className="technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
              {project.links && (
                <div className="project-links">
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgrammingProjects;

