import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../App';
import './CategoryPage.css';

function CategoryPage() {
  const { categoryId } = useParams();
  const { language, content } = useLanguage();
  const [categories, setCategories] = useState(null);
  const [items, setItems] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}data/categories.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}data/items.json`).then(res => res.json())
    ])
      .then(([categoriesData, itemsData]) => {
        setCategories(categoriesData);
        setItems(itemsData);
        
        const categoryIdNum = parseInt(categoryId);
        const foundCategory = categoriesData.categories?.find(c => c.id === categoryIdNum);
        setCategory(foundCategory);
      })
      .catch(err => console.error('Failed to load data:', err));
  }, [categoryId]);

  if (!content || !categories || !items || !category) {
    return <div className="loading">Loading...</div>;
  }

  const categoryIdNum = parseInt(categoryId);
  const activeItems = items.items?.filter(item => 
    item.active !== false && 
    item.categories?.includes(categoryIdNum)
  ) || [];

  return (
    <div className="category-page">
      <Link to="/" className="back-link">← Back to Categories</Link>
      <h1>{category[language]?.name || category.en?.name}</h1>
      
      {activeItems.length === 0 ? (
        <p className="no-items">No items available in this category.</p>
      ) : (
        <div className="items-grid">
          {activeItems.map((item) => (
            <Link
              key={item.id}
              to={`/item/${item.id}`}
              className="item-card"
            >
              {item.images && item.images.length > 0 && (
                <div className="item-image">
                  <img src={item.images[0]} alt={item[language]?.title || item.en?.title} />
                </div>
              )}
              <div className="item-content">
                <h2>{item[language]?.title || item.en?.title}</h2>
                <div className="item-price">{item.price} SEK</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;

