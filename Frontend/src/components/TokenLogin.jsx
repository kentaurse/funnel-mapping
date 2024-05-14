import axios from 'axios';

const token = localStorage.getItem('token');
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const tokenLogin = async () => {
  try {
    const res = await axios.get('/tokenLogin');
    return res;
  } catch (error) {
    return error;
  }
}

export { tokenLogin };