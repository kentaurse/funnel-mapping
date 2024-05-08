import axios from "axios";

const axiosSetting = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(error.message === 'Network Error'){
        Notification('Network Error!', 'error');
      }
      if (error.response) {
        if(error.response.data === "Unauthorized") {
          if(error.request.responseURL === `${process.env.REACT_API_BASE_URL}/login`){
            Notification('Incorrect Password!', 'error');
          }else return error.response;
        }
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
}

export { axiosSetting };