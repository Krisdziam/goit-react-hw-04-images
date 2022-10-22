import styles from './Button.module.css';
import { FaLongArrowAltDown } from 'react-icons/fa';

const Button = ({ onClick, children }) => (
  <div className={styles.btnContainer}>
    <button
      className={styles.loadMoreBtn}
      onClick={onClick}
      type="button"
    >
      {children}
      <FaLongArrowAltDown />
      Load more
    </button>
  </div>
);

export default Button;
