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
  // const [imageNames, setImageNames] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState('idle');

  const handleLoadMore = e => {
    console.log(e);

    setPage(prevState => prevState + 1);
    setIsLoading(true);

    // fetchImages(
    //  imageName,
    //   page
    // ).then(data =>{
    //   setItems((prevState) => [...prevState.items, ...data.hits])
    //   setStatus('resolved')
    //   setIsLoading(false);
    // }

    // );
  };

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setIsLoading(true);
    setStatus('pending');

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

  // const resetPage = () => {
  //   setPage(1)
  // };

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

// class ImageInfo extends Component {
//   state = {
//     imageName: '',
//     page: 1,
//     items: [],
//     isLoading: false,
//     error: null,
//     modalOpen: false,
//     largeImageURL: '',
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.imageName !== this.props.imageName) {
//       this.setState({
//         page: 1,
//         isLoading: true,
//         status: 'pending',
//       });
//       fetchImages(this.props.imageName)
//         .then(data =>
//           this.setState({
//             items: data.hits,
//             status: 'resolved',
//           })
//         )
//         .catch(error =>
//           this.setState({ error, status: 'rejected' })
//         )
//         .finally(() => this.setState({ isLoading: false }));
//     }
//   }
//   handleLoadMore = () => {
//     this.setState(
//       prevState => ({
//         page: prevState.page + 1,
//         isLoading: true,
//       }),
//       () => {
//         fetchImages(
//           this.props.imageName,
//           this.state.page
//         ).then(data =>
//           this.setState(prevState => {
//             return {
//               items: [...prevState.items, ...data.hits],
//               status: 'resolved',
//               isLoading: false,
//             };
//           })
//         );
//       }
//     );
//   };

//   openModal = () => {
//     this.setState(({ modalOpen }) => ({
//       modalOpen: !modalOpen,
//     }));
//   };

//   onGalleryItemClick = largeImageURL => {
//     this.setState({
//       largeImageURL,
//       modalOpen: true,
//     });
//   };

//   resetPage = () => {
//     this.setState({
//       page: 1,
//     });
//   };

// render() {
//   const {
//     items,
//     isLoading,
//     modalOpen,
//     largeImageURL,
//     status,
//   } = this.state;

// if (status === 'idle') {
//   return (
//     <p className={styles.findText}>
//       <MdOutlinePhotoSizeSelectActual
//         className={styles.findIcon}
//       />
//       Find your best images!
//     </p>
//   );
// }

// if (status === 'pending') {
//   return <Loader />;
// }

// if (status === 'rejected' || items.length === 0) {
//   return (
//     <h1 className={styles.title}>
//       We can not find images with "
//       {this.props.imageName}" name. Try another one!
//     </h1>
//   );
// }

// if (this.state.status === 'resolved') {
//   return (
//     <>
//       {modalOpen && (
//         <Modal
//           largeImageURL={largeImageURL}
//           onClose={this.openModal}
//         />
//       )}
//       <ImageGallery>
//         {items.map(image => (
//           <ImageGalleryItem
//             onImageClick={this.onGalleryItemClick}
//             key={image.id}
//             data={image}
//           />
//         ))}
//       </ImageGallery>

//       <Button onClick={this.handleLoadMore}>
//         {isLoading && <Loader />}
//       </Button>
//     </>
//   );
// }
//   }
// }
// export default ImageInfo;
