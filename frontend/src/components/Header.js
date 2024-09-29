import React from 'react'
import '../styles/Header.css';

const Header = ({setIsAdding,  setShowTable, showtable, employees, handleEdit, handleDelete}) => {
  return (
    <div className='container'>
        <h1>EMPLOYEE MANAGEMENT SYSTEM</h1>
        <div className='grid'>
            <button onClick={()=>setIsAdding(true)}>Add employee</button>
            
        </div>
    </div>
  )
}

export default Header