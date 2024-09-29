import React, { useState } from "react";
import axios from "axios";
import { end_user_api } from "../api/constApi";
import toast from "react-hot-toast";
import '../styles/Edit.css';

const AddEmployeeForm = ({setIsAdding}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    department: "",
    hireDate: "",
    contactInformation: {
      phone: "",
      address: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "address") {
      setFormData({
        ...formData,
        contactInformation: {
          ...formData.contactInformation,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name: formData.name,
        email: formData.email,
        jobTitle: formData.jobTitle,
        department: formData.department,
        hireDate: formData.hireDate,
        contactInformation: {
          phone: formData.contactInformation.phone,
          address: formData.contactInformation.address,
        },
      }
      console.log(user)
      const res = await axios.post(`${end_user_api}/create/employee`, user);
      toast.success(res.data.message)
      
      console.log(res)
      setIsAdding(false)
      // navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message)
    }
      setFormData({
        name: "",
        email: "",
        jobTitle: "",
        department: "",
        hireDate: "",
        contactInformation: {
          phone: "",
          address: "",
        },
      }); 
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
      <h3>Add New Employee</h3>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="text"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        placeholder="Job Title"
        required
      />

      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />

      <input
        type="date"
        name="hireDate"
        value={formData.hireDate}
        onChange={handleChange}
        placeholder="Hire Date"
        required
      />

      <input
        type="text"
        name="phone"
        value={formData.contactInformation.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />

      <input
        type="text"
        name="address"
        value={formData.contactInformation.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default AddEmployeeForm;
