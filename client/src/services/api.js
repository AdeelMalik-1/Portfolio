import axios from 'axios';

// Base URL from .env (VITE_API_URL), falling back to the local server.
const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// On a phone, "localhost" means the phone itself, not your laptop.
// If the site was opened through a LAN IP (e.g. 192.168.x.x), point the API at
// that same host so login, signup and the contact form reach the server.
const pageHost = window.location.hostname;
const isLocalPage = pageHost === 'localhost' || pageHost === '127.0.0.1';
const baseURL = isLocalPage ? envUrl : envUrl.replace(/localhost|127\.0\.0\.1/, pageHost);

const api = axios.create({
  baseURL,
  timeout: 60000, // generous, so a sleeping free-tier server (e.g. Render) can wake up
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;