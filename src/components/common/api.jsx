import axios from 'axios';

const API_KEY = '38931559-3de63a2d0d8ddd98ab89e5873';

export const getImages = async (values, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${values}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response.data;
};
