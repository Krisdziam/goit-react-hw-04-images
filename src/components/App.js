import { useState,useEffect } from 'react';
import ImageInfo from './ImageInfo';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './ServiceApi/ServiceApi';

export function App() {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSubmitHandler = inputImageName => {
    setImageName(inputImageName);
    setPage(1);
    setItems([]);
  };

  const handleLoadMore = () => {
    setPage((prevState) => prevState + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setIsLoading(true);
    // setStatus('pending');

    fetchImages(imageName, page)
      .then((data) => {
        setItems((prevState) => [...prevState, ...data.hits]);

        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => setIsLoading(false));
  }, [imageName, page]);



  return (
    <>
      <Searchbar onSubmit={formSubmitHandler}></Searchbar>

      <ImageInfo
        imageName={imageName}
        error={error}
        items={items}
        status={status}
        loadMore={handleLoadMore}
        isLoad={isLoading}
      />
    </>
  );
}
