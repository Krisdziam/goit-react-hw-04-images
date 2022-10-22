import React, { Component } from 'react';
import styles from '../Searchbar/Searchbar.module.css';
import { MdTravelExplore } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleInputChange = e => {
    this.setState({ imageName: e.currentTarget.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    if (this.state.imageName.trim() === '') {
      const error = toast.error(
        `Please, enter the name of image`,
        {
          autoClose: 2000,
        }
      );
      return error;
    }
    this.props.onSubmit(this.state.imageName);
    this.reset();
  };

  reset = () => {
    this.setState({
      imageName: '',
    });
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <form
            className={styles.form}
            onSubmit={this.handleSubmitForm}
          >
            <button
              className={styles.formBtn}
              type="submit"
            >
              <MdTravelExplore
                className={styles.formIcon}
              />
            </button>

            <input
              className={styles.formInput}
              onChange={this.handleInputChange}
              type="text"
              autoComplete="off"
              autoFocus
              value={this.state.imageName}
              placeholder="Search images and photos"
            />
          </form>
        </header>

        <ToastContainer />
      </>
    );
  }
}

export default Searchbar;
