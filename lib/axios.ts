import axios from "axios";

export const apiInstance = axios.create({
    baseURL: '/api/',
    headers: {
      'content-type': 'application/json',
    },
  });