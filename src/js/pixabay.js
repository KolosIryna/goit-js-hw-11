import axios from 'axios';

const URL = "https://pixabay.com/api/";
const API_KEY = "38987470-9f970206f85777d56fe530dc2";

async function imgParams(value, page) {
    axios.defaults.params = {
      key: API_KEY,
      q: value,
      image_type: 'photo',
    //   min_width: '260px',
    //   min_height: '300px',
      orientation: 'horizontal',
      safesearch: true,
    //   per_page: 40,
    //   page: page,
    };
    return await axios.get(${URL});
}

export {imgParams};