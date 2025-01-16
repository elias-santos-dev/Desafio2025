import axios from "axios";


export const apiClientLogin = axios.create({
    baseURL: 'https://test-api-y04b.onrender.com/',  // URL base da API
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export const apiClientCars = axios.create({
    baseURL: 'https://parallelum.com.br/fipe/api/',  // URL base da API
    headers: {
      'Content-Type': 'application/json',
    },
  });