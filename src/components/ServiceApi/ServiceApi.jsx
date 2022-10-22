const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29385955-aff2fabd11c0a187a88b06a62';

export function fetchImages(imageName, page = 1) {
  return fetch(
    `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (!res.ok) {
      throw new Error(
        `There are no images with ${imageName} name`
      );
    }
    return res.json();
  });
}
