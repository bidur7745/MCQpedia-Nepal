import api from '../api/axios';

export const feedbackService = {
    // Submit feedback form
    submitFeedback: async (feedbackData) => {
        try {
            const response = await api.post('/feedback', feedbackData);
            return response.data;
        } catch (error) {
            console.error('Error submitting feedback:', error);
            throw error.response?.data || error.message;
        }
    },

    // //  for admin panel)
    // getAllFeedback: async () => {
    //     try {
    //         const response = await api.get('/feedback');
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching feedbacks:', error);
    //         throw error.response?.data || error.message;
    //     }
    // },

    // // Get feedback by ID 
    // getFeedbackById: async (id) => {
    //     try {
    //         const response = await api.get(`/feedback/${id}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching feedback:', error);
    //         throw error.response?.data || error.message;
    //     }
    // }
};
