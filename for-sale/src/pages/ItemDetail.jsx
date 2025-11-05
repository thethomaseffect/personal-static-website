import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../App';
import Lightbox from '../components/Lightbox';
import './ItemDetail.css';

function ItemDetail() {
  const { itemId } = useParams();
  const { language, content } = useLanguage();
  const [item, setItem] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/items.json`)
      .then(res => res.json())
      .then(data => {
        const foundItem = data.items?.find(i => i.id === parseInt(itemId));
        setItem(foundItem);
      })
      .catch(err => console.error('Failed to load item:', err));
  }, [itemId]);

  if (!content || !item) {
    return <div className="loading">Loading...</div>;
  }

  const text = content[language] || content.en;
  const itemText = item[language] || item.en || {};
  const images = item.images || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="item-detail">
      <Link to={`/category/${item.categories?.[0]}`} className="back-link">
        ← Back to Category
      </Link>

      <div className="item-detail-content">
        <div className="item-images">
          {images.length > 0 ? (
            <>
              <div className="main-image">
                <img
                  src={images[0]}
                  alt={itemText.title}
                  onClick={() => openLightbox(0)}
                />
              </div>
              {images.length > 1 && (
                <div className="thumbnail-images">
                  {images.slice(1).map((img, index) => (
                    <img
                      key={index + 1}
                      src={img}
                      alt={`${itemText.title} ${index + 2}`}
                      onClick={() => openLightbox(index + 1)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>

        <div className="item-info">
          <h1>{itemText.title}</h1>
          <div className="item-price">{item.price} SEK</div>

          <div className="item-description">
            <h2>{text.descriptionLabel}</h2>
            <p>{itemText.description}</p>
          </div>

          <div className="item-terms">
            <h2>{text.termsTitle}</h2>
            <p>{text.termsText}</p>
          </div>
        </div>
      </div>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          title={itemText.title}
        />
      )}
    </div>
  );
}

export default ItemDetail;

