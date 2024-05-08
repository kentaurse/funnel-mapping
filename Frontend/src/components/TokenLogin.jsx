import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const tokenLogin = async () => {
  try {
    return await axios.get('/tokenLogin');
  } catch (error) {
    return error;
  }
}

export { tokenLogin };