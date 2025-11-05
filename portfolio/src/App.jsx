import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import WorkExperience from './pages/WorkExperience';
import ProgrammingProjects from './pages/ProgrammingProjects';
import CreativeWorks from './pages/CreativeWorks';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');
  const [content, setContent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/content.json`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  const getText = (key) => {
    if (!content) return '';
    return content[language]?.[key] || content.en?.[key] || key;
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">Thomas Effect</Link>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/portfolio' || location.pathname === '/portfolio/' ? 'active' : ''}>
              {getText('home')}
            </Link>
            <Link to="/work" className={location.pathname.includes('/work') ? 'active' : ''}>
              {getText('workExperience')}
            </Link>
            <Link to="/projects" className={location.pathname.includes('/projects') ? 'active' : ''}>
              {getText('programmingProjects')}
            </Link>
            <Link to="/creative" className={location.pathname.includes('/creative') ? 'active' : ''}>
              {getText('creativeWorks')}
            </Link>
          </div>
          <div className="language-switcher">
            <button 
              onClick={() => setLanguage('en')} 
              className={language === 'en' ? 'active' : ''}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('sv')} 
              className={language === 'sv' ? 'active' : ''}
            >
              SV
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/work" element={<WorkExperience language={language} />} />
          <Route path="/projects" element={<ProgrammingProjects language={language} />} />
          <Route path="/creative" element={<CreativeWorks language={language} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

