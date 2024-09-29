const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route to register a new user
const register = async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      
      // Validation for missing data
      if (!username || !email || !password) {
        return res.status(401).json({
          message: "All fields are required",
          success: false
        });
      }
      const userExist = await User.findOne({email})
      if(userExist){
        return res.status(401).json({
          message: "This user existed already",
          success: true
        })
      }
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({
          message: "Passwords do not match",
          success: false
        });
      }
  
      // Hash the password before saving
      const hashedPassword = await bcryptjs.hash(password, 10); 
  
      // Create user object
      const createUser = new User({
        username,
        email,
        password: hashedPassword, // Store the hashed password
      });
  
      // Save the user to the database
      await createUser.save();
  
      console.log("Account created successfully");
      return res.status(201).json({
        message: "Account created successfully",
        success: true
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message, // Send the actual error message
        success: false
      });
    }
  };
  
  // Route to login a user
  const login = async(req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            }); 
        }

       const isMatch = await bcryptjs.compare(password,user.password);

       if(!isMatch){
        return res.status(401).json({
            message: "Invalid email or password",
            success: false
        });
       }

       // tokendata
       const tokenData = {
        id: user._id
       }
       // token genereted using jwt
       const token = jwt.sign(tokenData,process.env.jwt_secret,{expiresIn: '1h'});
       // storing token in cookie
       return res.status(200).cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production', // set secure cookie in production
        sameSite: 'Strict' // to prevent CSRF attacks
       }).json({
        message: "Login succesfully",
        user,
        success:true
       })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
        message: error.message, // Send the actual error message
        success: false
        });
    }

}

  module.exports = {register,login}
  