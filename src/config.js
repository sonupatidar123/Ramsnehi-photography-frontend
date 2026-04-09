// Base URL for the Django backend API
// This points to your live backend by default, but can be overridden with a .env file locally
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ramsnehi-photography-backend.onrender.com';

export const API_BASE = `${API_BASE_URL}/api`;
export default API_BASE_URL;