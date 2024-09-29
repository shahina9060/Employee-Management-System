import React from "react";
import '../styles/List.css';

const List = ({employees, handleEdit, handleDelete}) => {

  return (
    <div className="tableContainer">

      {/* Display Employee List */}
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
          {employees.map((employee,i) => (
            <tr key={employee._id}>
              <td>{i+1}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.department}</td>
              <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
              <td>{employee.contactInformation.phone}</td>
              <td>{employee.contactInformation.address}</td>
              <td><div className="button-div">
              <span><button onClick={()=>{handleEdit(employee._id)}}>Edit</button></span>
              <span><button onClick={()=>{handleDelete(employee._id)}} >delete</button></span>
              </div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List