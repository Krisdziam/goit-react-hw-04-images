import { useState, useEffect } from 'react';
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

  const formSubmitHandler = inputValueName => {
    setImageName(inputValueName);
    setItems([]);
    setPage(1);
    setIsLoading(true);
    setStatus('pending');
  };

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

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler}></Searchbar>

      <ImageInfo
        imageName={imageName}
        error={error}
        items={items}
        onLoadMore={handleLoadMore}
        status={status}
        isLoading={isLoading}
      />
    </>
  );
}
