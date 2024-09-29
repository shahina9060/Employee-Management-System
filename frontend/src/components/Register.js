import React, { useState } from "react";
import  '../styles/Register.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {end_user_api} from '../api/constApi'
import toast from "react-hot-toast";
const Register = () => {
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(`${end_user_api}/register`)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log("before submit form data is: ",formData)

  const handleSubmit = async(e) => {
    e.preventDefault();
   console.log("form data is: ",formData)
   try {
    const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
    }
    const res = await axios.post(`${end_user_api}/register`,user)
    // console.log(res)
    toast.success(res.data.message)
    navigate('/');
    console.log("succesfull regiteration: ",res)
   } catch (error) {
    toast.success(error.response.data.message)
   }
   setFormData({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
   })
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
       
        </div>

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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
       
        </div>

        <button className="register-button" type="submit">Register</button>
        <p>
            New user ? <Link to="/login">Click Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
