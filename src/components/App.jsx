import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from './FetchAPI/FetchAPI';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorMessage } from './ErrorMessage/ErrorMessage.jsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (images.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [images]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getImages = async (searchQuery, page) => {
      try {
        setShowLoader(true);
        setShowErrorMessage(false);

        const data = await fetchImages(searchQuery, page);

        if (data.totalHits === 0) {
          setShowErrorMessage(true);
        }
        if (page < Math.ceil(data.totalHits) / 12) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
        data.hits.map(({ id, webformatURL, largeImageURL, tags }) =>
          setImages(prevImages => [
            ...prevImages,
            { id, webformatURL, largeImageURL, tags },
          ])
        );
      } catch (error) {
        setError(error);

        return Promise.reject(new Error(`No images ${searchQuery}`));
      } finally {
        setShowLoader(false);
      }
    };

    getImages(searchQuery, page);
  }, [error, page, searchQuery]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setShowErrorMessage(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onImageClick = (largeImageURL, tags) => {
    setModalImageURL({ largeImageURL, tags });

    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />

      {showErrorMessage && <ErrorMessage searchQuery={searchQuery} />}

      {images.length !== 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}

      {showLoader && <Loader />}

      {showBtn && !showLoader && <Button loadMore={loadMore} />}

      {showModal && (
        <Modal onClose={toggleModal} modalImageURL={modalImageURL} />
      )}
    </>
  );
}
