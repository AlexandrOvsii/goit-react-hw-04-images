import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import * as API from '../common/api';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal';
import Notiflix from 'notiflix';
import Loader from 'components/Loader/Loader';

class App extends Component {
  state = {
    error: false,
    isLoading: false,
    searchedImages: null,
    images: [],
    page: 1,
    largeImage: '',
    showModal: false,
    noImages: false,
    imageCount: 0,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.searchedImages !== this.state.searchedImages) {
      this.fetchImages();
    }
  }

  componentDidMount() {
    window.addEventListener('click', this.openModal);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.openModal);
  }

  handleSearchForm = e => {
    e.preventDefault();
    const searchedImages = e.currentTarget.elements.searchInput.value;
    this.setState({ searchedImages });
    e.currentTarget.reset();
  };

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });
      const images = await API.getImages(
        this.state.searchedImages,
        this.state.page
      );
      this.setState({ images: images.hits });

      this.setState({ imageCount: images.hits.length });

      if (images.hits.length === 0) {
        this.setState({ noImages: true });
      }
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    try {
      this.setState({ isLoading: true });
      const images = await API.getImages(
        this.state.searchedImages,
        this.state.page
      );

      console.log('Total Hits:', images.totalHits);

      if (this.state.imageCount >= 500) {
        console.log('Конец количества изображений');
        this.setState({ noImages: true });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
      }));
      this.setState(prevState => ({
        imageCount: prevState.imageCount + images.hits.length,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
    this.loadMoreImages();
  };

  openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ showModal: true, largeImage: e.target });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { error, isLoading, images, page, showModal, largeImage, noImages } =
      this.state;
    return (
      <div>
        <Searchbar handleSearchForm={this.handleSearchForm} />
        {isLoading && <Loader />}
        <ImageGallery images={images} />
        {error &&
          Notiflix.Notify.failure('Something wrong, please refresh a page')}
        {noImages &&
          Notiflix.Notify.info(
            'Sorry, no more images in your response. Try another word'
          )}
        {images.length && noImages === false && (
          <Button page={page} loadMore={this.loadMore} />
        )}
        {showModal && (
          <Modal largeImage={largeImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;

// class App extends Component {
//   state = {
//     showModal: false,
//   };

//   componentDidMount() {
//     console.log('componentDidMount');
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount');
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;

//     return (
//       <div>
//         <button type="button" onClick={this.toggleModal}>
//           Открыть модалку
//         </button>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <h1>привет</h1>
//             <p>
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//               Explicabo adipisci consequatur distinctio consectetur temporibus
//               cum eos, necessitatibus esse, mollitia, alias illo similique? Quam
//               fuga sequi quos! Voluptate deleniti quasi repellendus.
//             </p>
//             <button type="button" onClick={this.toggleModal}>
//               Закрыть модалку
//             </button>
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
