import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-react-burger-build-f3632.firebaseio.com/'
});

export default instance;