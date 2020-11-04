import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakeapi.plimsoftware.pt/instagram/',
});

export default api;
