import { useState } from 'react';
import styles from '../Searchbar/Searchbar.module.css';
import { MdTravelExplore } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleSubmitForm = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      const error = toast.error(
        `Please, enter the name of image`,
        {
          autoClose: 2000,
        }
      );
      return error;
    }
    onSubmit(imageName);
    setImageName('');
  };

  return (
    <>
      <header className={styles.header}>
        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >
          <button className={styles.formBtn} type="submit">
            <MdTravelExplore className={styles.formIcon} />
          </button>

          <input
            className={styles.formInput}
            onChange={(e) => setImageName(e.currentTarget.value.toLowerCase())}
            type="text"
            autoComplete="off"
            autoFocus
            value={imageName}
            placeholder="Search images and photos"
          />
        </form>
      </header>

      <ToastContainer />
    </>
  );
}
