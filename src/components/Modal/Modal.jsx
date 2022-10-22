import { Component } from "react";
import { createPortal } from "react-dom";

import styles from './Modal.module.css';



const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscClose);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscClose);
  }

  onEscClose = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, type } = this.props;
  
    return createPortal(
      <div onClick={this.onBackdropClick} className={styles.modalBackdrop}>
        <div className={styles.modalImage}>
       
          <img src={largeImageURL} alt={type} />
         
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;