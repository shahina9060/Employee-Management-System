import React, { useState } from "react";
import "../styles/SearchBar.css";
import Select from "react-select";
import axios from "axios";
import { end_user_api } from "../api/constApi";
import List from "./List";
import toast from "react-hot-toast";

const SearchBar = ({ employees, handleEdit, handleDelete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [search, setSearch] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [showtable, setShowTable] = useState(false);

  const options = [
    { value: "name", label: "name" },
    { value: "jobTitle", label: "jobTitle" },
    { value: "department", label: "department" },
  ];

  const searchHandle = (e) => {
    setSearch(e.target.value);
  };
  // console.log("search:", search);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSearchButton = async (e) => {

      e.preventDefault();
    
    //  console.log("button clicked");
    try {
      if (selectedOption.value === "name") {
        const employees = await axios.get(
          `${end_user_api}/searchbyname/employee/${search}`
        );
        // console.log(employees);
        toast.success(employees.data.message);
        setEmployeesList(employees.data.employees);

      } else if (selectedOption.value === "jobTitle") {
        const employees = await axios.get(
          `${end_user_api}/searchbyjobtitle/employee/${search}`
        );
        // console.log(employees);
        toast.success(employees.data.message);
        setEmployeesList(employees.data.employees);

      } else if (selectedOption.value === "department") {
        const employees = await axios.get(
          `${end_user_api}/searchbydepartment/employee/${search}`
        );
        // console.log(employees);
        toast.success(employees.data.message);
        setEmployeesList(employees.data.employees);

      }
    } catch (error) {
      // console.log(error);
      toast.success(error.response.data.message)
    }
    
    setShowTable(true)
   
  };

  return (
    <>
      <div className="dropdown-container">
        <Select
          classNamePrefix="react-select"
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isSearchable
        />
        <div className="search-div">
          <input
            type="text"
            value={search}
            name="search"
            placeholder="Type here..."
            onChange={searchHandle}
          />
          <button onClick={handleSearchButton}>search</button>
        </div>
      </div>
      {showtable && (
        <div>
          <table className="employee-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Hire Date</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesList.map((employee, i) => (
                <tr key={employee._id}>
                  <td>{i + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.jobTitle}</td>
                  <td>{employee.department}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td>{employee.contactInformation.phone}</td>
                  <td>{employee.contactInformation.address}</td>
                  <td>
                    <div className="button-div">
                      <span>
                        <button
                          onClick={() => {
                            handleEdit(employee._id);
                          }}
                        >
                          Edit
                        </button>
                      </span>
                      <span>
                        <button
                          onClick={() => {
                            handleDelete(employee._id);
                          }}
                        >
                          delete
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!showtable && (
        <List
          employees={employees}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default SearchBar;
