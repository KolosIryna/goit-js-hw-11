import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38987470-9f970206f85777d56fe530dc2';

async function imgParams(value, page) {
  const params = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  };

  try {
    const response = await axios.get(URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export { imgParams };
