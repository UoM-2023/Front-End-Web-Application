import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const API_URL = 'http://localhost:3001'

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Axios request interceptor. Before each request, check if the token is expired. If expired, refresh the token.
axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = getDecodedToken(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          const newToken = await refreshToken();
          config.headers['Authorization'] = `Bearer ${newToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Axios response interceptor to handle token refreshing. If a 401 error (Unauthorized) occurs, retry the request after refreshing the token.
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await refreshToken(); 
                const decoded = jwtDecode(data.token); 
                setAuthToken(data.token); 
                originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
                return axiosInstance(originalRequest); 
            } catch (err) {
                return Promise.reject(err); 
            }
        }
        return Promise.reject(error)
    }
);

export const logout = async () => {
    try {
        console.log('Axios logout called');
        await axiosInstance.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    } catch (error) {
        console.error('Logout error:', error);
    }

}

export const refreshToken = async () => {
    try{
        const response = await axiosInstance.post('/auth/refresh');
        const { token, userId } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setAuthToken(token);
        return token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
        throw error;
    }
};

export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
}

export const getDecodedToken = (token) => {
    console.log(token);
    return jwtDecode(token);
}

export default axiosInstance;
