import api from '../api/axios';

export const questionService = {
    getAllQuestions: async () => {
        try {
            const response = await api.get('/question-bank');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getQuestionById: async (id) => {
        try {
            const response = await api.get(`/question-bank/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getQuestionsByCategory: async (category) => {
        try {
            console.log('Making request to:', `/question-bank/${category}`);
            const response = await api.get(`/question-bank/${category}`);
            console.log('Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error.response?.data || error.message;
        }
    },

    getAllCategories: async () => {
        try {
            const response = await api.get('/question-bank/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error.response?.data || error.message;
        }
    },

    getDifficulties: async () => {
        try {
            const response = await api.get('/question-bank/difficulties');
            return response.data;
        } catch (error) {
            console.error('Error fetching difficulties:', error);
            throw error.response?.data || error.message;
        }
    }
}; 