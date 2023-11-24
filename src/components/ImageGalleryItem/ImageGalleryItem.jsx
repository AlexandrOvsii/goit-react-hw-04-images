import React from 'react';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image }) {
  return (
    <img
      className={css.ImageGalleryItemImage}
      src={image.webformatURL}
      alt={image.user}
    />
  );
}

export default ImageGalleryItem;
