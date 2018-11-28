import axios from 'axios';

const instance = axios.create({
    baseURL:"https://react-burger-app-7b464.firebaseio.com/"
});

export default instance;