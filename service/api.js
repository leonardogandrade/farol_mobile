import axios from 'axios';
import env from '../environment.json';

const api = axios.create({
    baseURL: env.api,
});

export default api;
