import axios from "axios";

const WordPressAPI = axios.create({
  baseURL: import.meta.env.VITE_WORDPRESS_API_BASE_URL
});

export default WordPressAPI;