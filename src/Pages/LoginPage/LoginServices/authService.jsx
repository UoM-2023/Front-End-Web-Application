import axios from 'axios';
import { jwtDecode } from 'jwt-decode'


// Axios request interceptor. Before each request, check if the token is expired. If expired, refresh the token.
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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

const logout = async () => {
    try {
        await axios.post('http://localhost:3001/auth/logout');
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

const refreshToken = async () => {
    try{
        const response = await axios.post('http://localhost:3001/auth/refresh');
        const { token } = response.data;
        localStorage.setItem('token', token);
        setAuthToken(token);
        return token;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        logout();
        throw error;
    }
};

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

const getDecodedToken = (token) => {
    return jwtDecode(token);
}

export { setAuthToken, logout, refreshToken, getDecodedToken };