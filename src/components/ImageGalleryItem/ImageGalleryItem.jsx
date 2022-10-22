import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data, onImageClick }) => {
  const { webformatURL, largeImageURL, type } = data;

  const onImageModalOpenClick = () =>
    onImageClick(largeImageURL);

  return (
    <li className={styles.item}>
      <img
        className={styles.image}
        src={webformatURL}
        alt={type}
        onClick={onImageModalOpenClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
