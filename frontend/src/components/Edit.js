import React from 'react';
import '../styles/Edit.css';

import axios from 'axios';
import toast from 'react-hot-toast';
import { end_user_api } from '../api/constApi';

const Edit = ({ setIsEditing, selectedEmployee, setSelectedEmployee, setEmployees }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "address") {
      // Update nested contactInformation
      setSelectedEmployee((prevState) => ({
        ...prevState,
        contactInformation: {
          ...prevState.contactInformation,
          [name]: value,
        },
      }));
    } else {
      // Update top-level fields
      setSelectedEmployee((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the updated user data
      const updatedEmployee = {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        jobTitle: selectedEmployee.jobTitle,
        department: selectedEmployee.department,
        hireDate: selectedEmployee.hireDate,
        contactInformation: {
          phone: selectedEmployee.contactInformation?.phone,
          address: selectedEmployee.contactInformation?.address,
        },
      };
      
      // Update employee API call
      const res = await axios.patch(`${end_user_api}/update/employee`, updatedEmployee);
      toast.success(res.data.message);

      // Update the employees state
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === selectedEmployee._id ? selectedEmployee : emp
        )
      );

      // Close the editing form
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Error updating employee");
    }
  };

  return (
    <div className='formContainer'>
    <form onSubmit={handleSubmit}>
      <h3>Edit Employee</h3>

      <input
        type="text"
        name="name"
        value={selectedEmployee?.name || ''}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={selectedEmployee?.email || ''}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <input
        type="text"
        name="jobTitle"
        value={selectedEmployee?.jobTitle || ''}
        onChange={handleChange}
        placeholder="Job Title"
        required
      />

      <input
        type="text"
        name="department"
        value={selectedEmployee?.department || ''}
        onChange={handleChange}
        placeholder="Department"
        required
      />

      <input
        type="date"
        name="hireDate"
        value={selectedEmployee?.hireDate ? selectedEmployee.hireDate.split('T')[0] : ''}
        onChange={handleChange}
        placeholder="Hire Date"
        required
      />

      <input
        type="text"
        name="phone"
        value={selectedEmployee?.contactInformation?.phone || ''}
        onChange={handleChange}
        placeholder="Phone"
        required
      />

      <input
        type="text"
        name="address"
        value={selectedEmployee?.contactInformation?.address || ''}
        onChange={handleChange}
        placeholder="Address"
        required
      />

      <button type="submit">Update</button>
    </form>
    </div>
  );
};

export default Edit;
