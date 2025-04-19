import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/homepage/Home';
import Navbar from './Components/navbar/Navbar';
import About from './Pages/about/About';
import Footer from './Components/footer/Footer';
import Register from './Pages/Register/Register';
import PrivacyPolicy from './Pages/privacyPolicy/Privacy';
import Terms from './Pages/privacyPolicy/Terms';
import Questionbank from './Pages/practice/Questionbank';
import Question from './Pages/practice/Question';
import Profile from './Pages/Profile/Profile';
import { AuthProvider } from './Contexts/AuthContext';

function App() {
  const location = useLocation(); // Get current route

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question-bank" element={<Questionbank />} />
        <Route path="/question-bank/:category" element={<Question />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<Terms />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      
      {/* Render Footer only if the route is NOT /profile */}
      {location.pathname !== "/profile" && <Footer />}
    </AuthProvider>
  );
}

export default App;
