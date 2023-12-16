import React, { useEffect } from 'react';
import css from './Modal.module.css';

function Modal({ largeImage, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImage.src} alt={largeImage.alt} />
      </div>
    </div>
  );
}

export default Modal;
