const express = require('express');
const { login, register } = require('../controllers/user');
const {createEmp, updateEmp,getEmp, deleteEmp, searchByName, searchByJobTitle, searchBydepartment} = require('../controllers/employee');


const routes = express.Router();

routes.post('/login',login)
routes.post('/register',register)
routes.post('/create/employee',createEmp)
routes.get('/get/employee', getEmp)
routes.patch('/update/employee', updateEmp)
routes.delete('/delete/employee/:id', deleteEmp)
routes.get('/searchbyname/employee/:name', searchByName);
routes.get('/searchbyjobtitle/employee/:jobTitle', searchByJobTitle);
routes.get('/searchbydepartment/employee/:department', searchBydepartment);

module.exports = routes