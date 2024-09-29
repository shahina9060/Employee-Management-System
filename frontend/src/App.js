
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import  { Toaster } from 'react-hot-toast';
import AddEmployeeForm from './components/AddEmployeeForm';
import Edit from './components/Edit';
import Delete from './components/Delete';
import SearchBar from './components/SearchBar';
import List from './components/List';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/addemployeeform' element={<AddEmployeeForm/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/delete' element={<Delete/>}/>
      <Route path='/searchbar' element={<SearchBar/>}/>
      <Route path='/list' element={<List/>}/>
    </Routes>
    <Toaster/>
  </Router>
  
  );
}

export default App;
