import ImageGalleryItem from 'components/ImageGalleryItem';
import React from 'react';
import css from './ImageGallery.module.css';

function ImageGallery({ images }) {
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return (
          <li key={image.webformatURL} className={css.ImageGalleryItem}>
            <ImageGalleryItem image={image} />
          </li>
        );
      })}
    </ul>
  );
}

export default ImageGallery;
