import api from '../api/axios';

export const userQuestionService = {
    // Create a new questiosn
    createQuestion: async (questionData) => {
        try {
            const response = await api.post('/questions/create', questionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get questions by category and difficulty
    getQuestions: async (category, difficulty) => {
        try {
            console.log('Fetching questions for category:', category);
            // Convert category to lowercase to match backend
            const response = await api.get(`/questions/${category.toLowerCase()}`);
            console.log('Response from server:', response.data);
            
            if (!response.data || !response.data.questions) {
                console.error('Invalid response format:', response.data);
                throw new Error('Invalid response format from server');
            }

            const allQuestions = response.data.questions;
            console.log('Total questions found:', allQuestions.length);
            
            const filteredQuestions = difficulty 
                ? allQuestions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase())
                : allQuestions;
            
            console.log('Questions after filtering:', filteredQuestions);
            return filteredQuestions;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error.response?.data || error.message;
        }
    },

    // Get user's created questions
    getMyQuestions: async () => {
        try {
            const response = await api.get('/questions/my-questions');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update a question
    updateQuestion: async (id, questionData) => {
        try {
            const response = await api.put(`/questions/edit/${id}`, questionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a question
    deleteQuestion: async (id) => {
        try {
            const response = await api.delete(`/questions/delete/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all categories
    getAllCategories: async () => {
        try {
            const response = await api.get('/questions');
            const categories = [...new Set(response.data.questions.map(q => q.category))];
            return categories;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all difficulties
    getDifficulties: async () => {
        try {
            const response = await api.get('/questions');
            const difficulties = [...new Set(response.data.questions.map(q => q.difficulty))];
            return difficulties;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
}; 