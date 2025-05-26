export const BASE_URL = "https://notes-backend-cica-1096478121389.us-central1.run.app";
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const isLoggedIn = () => !!getToken();
