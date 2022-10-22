import styles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => (
  <ul className={styles.list}>{children}</ul>
);

export default ImageGallery;
