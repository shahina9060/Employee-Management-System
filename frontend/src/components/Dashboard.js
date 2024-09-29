import React, { useEffect, useState } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
// import "../styles/Dashboard.css"; 
import axios from "axios";
import Header from "./Header";
import Edit from "./Edit";
import { end_user_api } from "../api/constApi";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${end_user_api}/get/employee`);
        console.log(res);
        setEmployees(res.data.employees);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApi();
  },[]);

  const handleEdit = (id) => {
    const employee = employees.find(employee => employee._id === id);
    
    if (employee) {
      console.log("Employee to be selected:", employee); // Log before setting state
      setSelectedEmployee(employee);
      setIsEditing(true);
    } else {
      console.log("Employee not found!");
    }
  };

  const handleDelete = async(id) => {
      console.log(id)
    try {
      const res = await axios.delete(`${end_user_api}/delete/employee/${id}`)
      toast.success(res.data.message);
      console.log(res)
    } catch (error) {
      console.log(error)
      toast.success(error.response.data.message);
    }
   
  };

  return (
    <div>
      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} 
          
          />
          <SearchBar
            employees={employees} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            />
        </>
      )}
      {isAdding && (
        <>
          <AddEmployeeForm setIsAdding={setIsAdding}/>
        </>
      )}
      {isEditing && (
        <>
          <Edit 
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            setEmployees = {setEmployees}
            setIsEditing={setIsEditing}
          />
        </>
      )}

   
    </div>
  );
};

export default Dashboard;
