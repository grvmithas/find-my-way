import axios from 'axios';

import { baseUrl } from '../config';

//wrapper over axios
const restClient = axios.create({
    baseURL: baseUrl
});

export { restClient };