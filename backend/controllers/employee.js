
const Employee = require("../models/empModel")
// create employee
const createEmp = async(req,res)=>{
    try {
        const emp = new Employee(req.body)
    await emp.save()
    return res.status(200).json({
        message: "Employee created successfully",
        success: true
    })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message: "Something went wrong",
            success: false
        })
    }
}

// read/get employee
const getEmp = async(req,res)=>{
    try {
        const employees = await Employee.find({});
        return res.status(200).json({
            message: "fetched successfully",
            employees,
            success:true
        })

    } catch (error) {
        return res.status(404).json({
            message: error,
            success: false
        })
    }
}

// update employee
const updateEmp = async(req,res)=>{
    
    try {
        const {email} = req.body;
        const emp = await Employee.findOne({email});

        if (!emp) {
          return res.status(404).json({
            message: "Employee not found",
            success: false
          });
        }
    
        const updatedEmp = await Employee.findByIdAndUpdate(emp._id, req.body)
        
        return res.status(200).json({
            message: "Employee updated successfully",
            updatedEmp,
            success: true
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
            success: false
        })
    }

}

// delete employee
const deleteEmp = async (req, res) => {
    try {
      const { id } = req.params;  // Get the id from URL parameters
      console.log('ID received:', id);  // Log the id to check if it's received correctly
  
      // If no id is found, return an error
      if (!id) {
        return res.status(400).json({ message: "Invalid employee ID", success: false });
      }
  
      const emp = await Employee.findById(id);  // Find the employee by id
      if (!emp) {
        return res.status(404).json({
          message: "Employee not found",
          success: false
        });
      }
  
      await Employee.findByIdAndDelete(id);  // Delete employee by id
  
      return res.status(200).json({
        message: "Employee deleted successfully",
        success: true
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      return res.status(500).json({
        message: "Failed to delete employee",
        success: false,
        error: error.message
      });
    }
  };

  // searches 

  const searchByName = async (req, res) => {
    try {
      const { name } = req.params;
      console.log("Name received:", name);
      
      // const employees = await Employee.find({ name });

      // Use $regex for case-insensitive search
    const employees = await Employee.find({ name: { $regex: name, $options: 'i' } });

      
      if (!employees) {
        return res.status(404).json({
          message: "No employee found",
          success: false
        });
      }
  
      return res.status(200).json({
        message: "Successfully fetched data",
        employees,
        success: true
      });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        message: "Server error",
        success: false
      });
    }
  };



  // search by job title
  const searchByJobTitle = async (req, res) => {
    try {
      const { jobTitle } = req.params;
      console.log("Name received:", jobTitle);
      
      // const employees = await Employee.find({ jobTitle });
      // Use $regex for case-insensitive search
    const employees = await Employee.find({ jobTitle: { $regex: jobTitle, $options: 'i' } });

      
      if (!employees) {
        return res.status(404).json({
          message: "No employee found",
          success: false
        });
      }
  
      return res.status(200).json({
        message: "Successfully fetched data",
        employees,
        success: true
      });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        message: "Server error",
        success: false
      });
    }
  };
  

  // search by department
  const searchBydepartment = async (req, res) => {
    try {
      const { department } = req.params;
      console.log("department received:", department);
      
      // const employees = await Employee.find({ department });
      // Use $regex for case-insensitive search
    const employees = await Employee.find({ department: { $regex: department, $options: 'i' } });

      
      if (employees.length === 0) {
        return res.status(404).json({
          message: "No employee found",
          success: false
        });
      }
  
      return res.status(200).json({
        message: "Successfully fetched data",
        employees,
        success: true
      });
  
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        message: "Server error",
        success: false
      });
    }
  };

module.exports = {createEmp, getEmp, updateEmp, deleteEmp, searchByName, searchByJobTitle, searchBydepartment}