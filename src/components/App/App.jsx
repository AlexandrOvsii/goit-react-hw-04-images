import React, { useEffect, useState } from 'react';
import Searchbar from 'components/Searchbar';
import * as API from '../common/api';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Notiflix from 'notiflix';
import Loader from 'components/Loader';

function App() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchImages, setSearchImages] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [noImages, setNoImages] = useState(false);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    if (searchImages === null) {
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const imagesArray = await API.getImages(searchImages, page);
        setImages(prevState => [...prevState, ...imagesArray.hits]);
        setImageCount(prevState => prevState + imagesArray.hits.length);

        if (imagesArray.hits.length === 0 || imageCount >= 500) {
          setNoImages(true);
          setImages([]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, searchImages]);

  useEffect(() => {
    window.addEventListener('click', openModal);
    return () => {
      window.removeEventListener('click', openModal);
    };
  });

  const handleSearchForm = e => {
    e.preventDefault();
    const searchImageValue = e.currentTarget.elements.searchInput.value;
    setSearchImages(searchImageValue);
    setImages([])
    setPage(1)
    setImageCount(0)
    setNoImages(false)
    e.currentTarget.reset();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setShowModal(true);
    setLargeImage(e.target);
  };

  return (
    <div>
      <Searchbar handleSearchForm={handleSearchForm} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {error &&
        Notiflix.Notify.failure('Something wrong, please refresh a page')}
      {noImages &&
        Notiflix.Notify.info(
          'Sorry, no more images in your response. Try another word'
        )}
      {images.length > 0 && noImages === false && (
        <Button page={page} loadMore={loadMore} />
      )}
      {showModal && <Modal largeImage={largeImage} closeModal={closeModal} />}
    </div>
  );
}

export default App;
