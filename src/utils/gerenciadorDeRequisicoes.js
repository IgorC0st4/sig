import axios from 'axios';

const gerenciadorDeRequisicoes = axios.create({
  baseURL: 'http://192.168.0.21:3000/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default gerenciadorDeRequisicoes;
