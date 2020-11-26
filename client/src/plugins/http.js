/* eslint-disable no-param-reassign */
import axios from 'axios';

const ax = axios.create({
  baseURL: process.env.NODE_ENV === 'local' ? 'http://localhost:3000/api/v1' : '/api/v1',
});

export default {
  install(Vue) {
    Vue.prototype.$http = ax;
  },
};
