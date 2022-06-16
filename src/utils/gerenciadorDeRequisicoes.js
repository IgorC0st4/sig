import axios from 'axios';

const gerenciadorDeRequisicoes = axios.create({
  baseURL: 'https://high-level-detail-api.herokuapp.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default gerenciadorDeRequisicoes;
