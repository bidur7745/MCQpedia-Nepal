import React, { useState } from 'react';
import { feedbackService } from '../../services/feedbackService';
import './form.css';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        description: ''
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await feedbackService.submitFeedback(formData);
            setMessage({ type: 'success', text: response.message || 'Feedback submitted successfully!' });
            setFormData({ name: '', email: '', phone: '', subject: '', description: '' }); // Clear form
        } catch (error) {
            setMessage({ type: 'error', text: error || 'Failed to submit feedback.' });
        }
    };

    return (
        <div className="feedback-form-container">
            <h2>We’d love to hear from you</h2>
            <p>Send us any queries, feedback, or suggestions</p>
            
            {message && <div className={`message ${message.type}`}>{message.text}</div>}

            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone No.:</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Enter your feedback or query" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default FeedbackForm;
