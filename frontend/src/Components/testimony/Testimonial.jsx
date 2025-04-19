import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./testimonials.css"; // Import CSS file
import { assets } from "../../assets/assets";

const testimonials = [
  {
    name: "Bidur Siwakoti",
    role: "Founder, MCQpedia Nepal",
    feedback:
      "MCQpedia is revolutionizing online education. The platform makes learning accessible and efficient for students across Nepal!",
    image:"https://static.vecteezy.com/system/resources/thumbnails/054/475/923/small/a-cheerful-cartoon-character-in-a-suit-with-glasses-confidently-gesturing-with-both-hands-while-standing-at-a-desk-png.png", 
  },
  {
    name: "Sita Sharma",
    role: "Educator",
    feedback:
      "A great initiative for students! The MCQs are well-structured, and the real-time analytics help students track their progress.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB6wpSTwywg2M9-J5jHgYKM_hWhfBpsCeGgaPM_J8MNyJhFe03Z_MmdOYntGoLeB2d3dM&usqp=CAU",
  },
  {
    name: "Ramesh Karki",
    role: "Student",
    feedback:
      "I love using MCQpedia for my studies. The instant results and explanations are super helpful!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
  },
  {
    name: "Anjali Shrestha",
    role: "Parent",
    feedback:
      "MCQpedia has helped my child improve his grades. The platform is user-friendly and engaging for students.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqCzc5A0i6-2DBkGnT8d-_A2YJwmLfsF_Ww&s",
  },
  {
    name: "Rajesh Koirala",
    role: "Student",
    feedback:"MCQpedia is a game-changer for me. The platform has helped me prepare for my exams effectively.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYN4scLAOk6JcRBGzBZrq9N4zSHo6oOB_aycIUGb6FlF48fK8XsTr1a6AJZgMuYrduBeY&usqp=CAU",
  }
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonial-container">
      <h1 className="testimonial-heading">Testimonials</h1>

     
      <div className="testimonial-content">
        <img
          src={testimonials[index].image}
          alt={testimonials[index].name}
          className="testimonial-img"
        />
        <p className="testimonial-feedback">"{testimonials[index].feedback}"</p>
        <h3 className="testimonial-name">{testimonials[index].name}</h3>
        <p className="testimonial-role">{testimonials[index].role}</p>
      </div>

      {/* Navigation Arrows */}
      <div className="testimonial-buttons">
        <button onClick={prevTestimonial} className="nav-btn">
          <FaChevronLeft />
        </button>
        <button onClick={nextTestimonial} className="nav-btn">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
