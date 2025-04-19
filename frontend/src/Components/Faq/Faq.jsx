import React, { useState } from 'react';
import './faq.css';

const Faq = () => {
  // State to keep track of open questions
  const [openQuestion, setOpenQuestion] = useState(null);

  // FAQ data
  const faqData = [
    {
      question: 'What is MCQpedia Nepal?',
      answer: 'MCQpedia Nepal is Nepal\'s first comprehensive online platform dedicated to MCQ-based exams. The platform offers a wide variety of practice sets, live exams, and detailed analytics to help students track their performance and improve their skills. It is designed to support students preparing for competitive exams, academic tests, and various entrance exams, providing resources to help them succeed in their studies.'
    },
    {
      question: 'Who can use MCQpedia Nepal?',
      answer: 'MCQpedia Nepal is designed for a wide range of users, including students, teachers, and anyone interested in enhancing their knowledge and preparing for exams. Whether you\'re a school student, a college student, or preparing for a government exam, the platform is suitable for all levels of learners. Teachers and educators can also use the platform to access resources or contribute content to help other learners.'
    },
    {
      question: 'How do I get started with MCQpedia Nepal?',
      answer: 'Getting started with MCQpedia Nepal is simple. To begin, click on the “Sign Up” button located on the homepage. You can either register using your email address and create a password or use your Google account for quick registration. After successfully signing up, you’ll have access to a wide range of live exams and practice sets tailored to your preparation needs. You can also track your progress, save results, and revisit any exam at any time to review your performance.'
    },
    {
      question: 'How are the MCQ exams created, and can I contribute?',
      answer: 'The MCQ exams on MCQpedia Nepal are created in partnership with experienced educators and academic institutions from across Nepal. These exams are carefully designed to match current educational standards and exam formats. Registered users who are subject matter experts or have knowledge in specific fields can contribute by submitting their own MCQs for review. If approved by the platform’s content moderation team, your questions will be added to relevant practice sets and exams to benefit other learners.'
    },
    {
      question: 'What types of exams are available on the platform?',
      answer: 'MCQpedia Nepal offers a wide range of MCQ exams across various subjects, such as science, mathematics, general knowledge, and more. The exams are categorized into two main types: practice sets and live exams. Practice sets are designed for self-study, while live exams simulate actual test conditions, allowing students to assess their preparedness. You can easily filter and select the exams based on the subject you wish to focus on or the type of exam you prefer to take.'
    },
    {
      question: 'Is MCQpedia Nepal free to use?',
      answer: 'Yes, MCQpedia Nepal is completely free to use! We believe in making quality education accessible to everyone, regardless of financial background. There are no hidden fees, and we do not offer any premium services. All resources, including practice exams, live tests, and performance tracking, are available to every registered user at no cost. The platform is developed with the mission to provide free, reliable, and high-quality educational content to learners in Nepal.'
    },
    {
      question: 'Is my personal information safe on MCQpedia Nepal?',
      answer: 'Yes, your personal information is absolutely safe with us. We take your privacy seriously and follow strict data protection protocols to ensure that all the information you provide is kept confidential. MCQpedia Nepal uses industry-standard encryption techniques and secure servers to protect user data. We do not share your personal information with third parties unless required by law, and we take every precaution to ensure your details are secure while using the platform.'
    }
  ];
  
  // Toggle the question answer
  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleQuestion(index)}>
            {faq.question}
          </div>
          {openQuestion === index && (
            <div className="faq-answer">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;
