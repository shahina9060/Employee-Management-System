import React, { useState } from "react";
import '../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from 'axios'
import { end_user_api } from "../api/constApi";
const Login = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("before login form data is: ",formData)
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form data is: ",formData)
    try {
      const user = { 
        email: formData.email,
        password: formData.password
      }
      const res = await axios.post(`${end_user_api}/login`,user)
      toast.success(res.data.message)
      navigate('/dashboard');
    } catch (error) {
      toast.success(error.response.data.message);
    }
   setFormData({
    email: "",
    password: "",
   })
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          
        </div>

        <button type="submit">Login</button>
        <p>
            Alrady have an account ? <Link to="/register">Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
