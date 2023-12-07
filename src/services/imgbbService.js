import axios from 'axios';

const API_KEY = '5047c8ac1da95712d2cf5983581a7d00';
const API_URL = 'https://api.imgbb.com/1/';

export default {
  uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    return axios.post(`${API_URL}images/upload?key=${API_KEY}`, formData);
  },
  getImages() {
    return axios.get(`${API_URL}images?key=${API_KEY}`);
  },
};
