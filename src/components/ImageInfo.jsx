import { useState, useEffect } from 'react';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './ServiceApi/ServiceApi';
import styles from './ImageInfo.module.css';
import { MdOutlinePhotoSizeSelectActual } from 'react-icons/md';

export default function ImageInfo({ imageName }) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setIsLoading(true);

    fetchImages(imageName, page)
      .then(data => {
        setItems(prevState => [...prevState, ...data.hits]);

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => setIsLoading(false));
  }, [imageName, page]);

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const onGalleryItemClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setModalOpen(true);
  };

  if (status === 'idle') {
    return (
      <p className={styles.findText}>
        <MdOutlinePhotoSizeSelectActual
          className={styles.findIcon}
        />
        Find your best images!
      </p>
    );
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected' || items.length === 0) {
    return (
      <h1 className={styles.title}>
        We can not find images with "{imageName}" name. Try
        another one!
      </h1>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        {modalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={openModal}
          />
        )}
        <ImageGallery>
          {items.map(image => (
            <ImageGalleryItem
              onImageClick={onGalleryItemClick}
              key={image.id}
              data={image}
            />
          ))}
        </ImageGallery>

        <Button onClick={handleLoadMore}>
          {isLoading && <Loader />}
        </Button>
      </>
    );
  }
}
