import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://192.168.2.142:3333',
});

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = await SecureStore.getItemAsync('refreshToken');

            const response = await axios.post(api.defaults.baseURL + '/auth/refresh', {
                refreshToken
            });

            const { accessToken, newRefreshToken } = response.data;

            await SecureStore.setItemAsync('accessToken', accessToken);
            await SecureStore.setItemAsync('refreshToken', newRefreshToken);

            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');

            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
}
);

export default api;