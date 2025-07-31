// src/api.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getDepartments = () =>
  axios.get(`${API_BASE}/departments`).then(res => res.data.departments);

export const getDepartment = (id) =>
  axios.get(`${API_BASE}/departments/${id}`).then(res => res.data);

export const getProducts = (params) =>
  axios.get(`${API_BASE}/products`, { params }).then(res => res.data);

export const getProduct = (id) =>
  axios.get(`${API_BASE}/products/${id}`).then(res => res.data.item);
