import React from 'react';
import { useLocation } from 'react-router-dom';
import Signup from '../../Components/signUp/Signup';
import Login from '../../Components/login/Login';
import './register.css'


const Register = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const component = searchParams.get('component');

  return (
    <div className="register-wrapper">
      {component === 'signup' ? <Signup /> : <Login />}
    </div>
  );
};

export default Register;
