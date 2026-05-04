import axios from 'axios';

const { apiHost = '' } = window.conviqConfig || {};
const wootAPI = axios.create({ baseURL: `${apiHost}/` });

export default wootAPI;
