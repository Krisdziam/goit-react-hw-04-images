import { useState } from 'react';
import ImageInfo from './ImageInfo';
import Searchbar from './Searchbar/Searchbar';

export function App() {
  const [imageName, setImageName] = useState('');

  const formSubmitHandler = imageName => {
    setImageName(imageName);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler}></Searchbar>

      <ImageInfo imageName={imageName} />
    </>
  );
}
