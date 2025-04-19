import api from '../api/axios';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/user/login', credentials);
            console.log('Raw login response:', response);
            if (response.data) {
                return response.data;
            }
            throw new Error('No data in response');
        } catch (error) {
            console.error('Login request error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                throw error.response.data;
            }
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/user/register', userData);
            console.log('Raw register response:', response);
            if (response.data) {
                return response.data;
            }
            throw new Error('No data in response');
        } catch (error) {
            console.error('Register request error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                throw error.response.data;
            }
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await api.post('/user/logout');
            return response.data;
        } catch (error) {
            console.error('Logout request error:', error);
            if (error.response) {
                throw error.response.data;
            }
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const response = await api.get('/user/me');
            console.log('Raw profile response:', response);
            if (response.data) {
                return response.data;
            }
            throw new Error('No data in response');
        } catch (error) {
            console.error('Profile request error:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                throw error.response.data;
            }
            throw error;
        }
    }
}; 