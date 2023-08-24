import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38987470-9f970206f85777d56fe530dc2';

async function imgParams(value, page) {
  let pageEl = 1;

  const params = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: pageEl,
  };

  try {
    const response = await axios.get(URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { imgParams };
