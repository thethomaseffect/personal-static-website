import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ItemDetail from './pages/ItemDetail';
import './App.css';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

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

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content }}>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <a href="/for-sale" className="logo">For Sale</a>
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
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
          </Routes>
        </main>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;

