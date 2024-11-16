import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '36431598-58be2282cdfdc5fc3df430395';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${API_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response.data;
}