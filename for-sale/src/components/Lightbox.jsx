import { useEffect } from 'react';
import './Lightbox.css';

function Lightbox({ images, currentIndex, onClose, onNext, onPrev, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev}>
          ‹
        </button>
        <div className="lightbox-image-container">
          <img
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
          />
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        <button className="lightbox-nav lightbox-next" onClick={onNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default Lightbox;

