import { useState, useEffect } from 'react';
import './CreativeWorks.css';

function CreativeWorks({ language }) {
  const [content, setContent] = useState(null);
  const [creativeData, setCreativeData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/content.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}data/creative-works.json`).then(res => res.json())
    ])
      .then(([contentData, creativeData]) => {
        setContent(contentData);
        setCreativeData(creativeData);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  if (!content || !creativeData) {
    return <div className="loading">Loading...</div>;
  }

  const text = content[language] || content.en;
  const works = creativeData.works || [];

  return (
    <div className="creative-works">
      <h1>{text.creativeWorks}</h1>
      <p className="description">{text.creativeWorksDesc}</p>

      <div className="works-grid">
        {works.map((work, index) => (
          <div key={index} className="work-card">
            {work.image && (
              <div className="work-image">
                <img src={work.image} alt={work[language]?.title || work.en?.title} />
              </div>
            )}
            <div className="work-content">
              <h2>{work[language]?.title || work.en?.title}</h2>
              {work[language]?.description && (
                <p className="work-description">{work[language].description}</p>
              )}
              {work.medium && (
                <div className="work-medium">{work.medium}</div>
              )}
              {work.links && (
                <div className="work-links">
                  {work.links.url && (
                    <a href={work.links.url} target="_blank" rel="noopener noreferrer" className="work-link">
                      View
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

export default CreativeWorks;

