import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({
  onClose,
  largeImageURL,
  type,
}) {
  useEffect(() => {
    window.addEventListener('keydown', onEscClose);

    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  });

  const onEscClose = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      onClick={onBackdropClick}
      className={styles.modalBackdrop}
    >
      <div className={styles.modalImage}>
        <img src={largeImageURL} alt={type} />
      </div>
    </div>,
    modalRoot
  );
}
