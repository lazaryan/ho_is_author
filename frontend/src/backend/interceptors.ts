import axios, { AxiosError } from 'axios';
import displayResponseError from 'helpers/displayResponseError';

const applyInterceptors = () => {
  axios.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      displayResponseError(error);
      
      return Promise.reject(error);
    }
  )
};

export default applyInterceptors;
