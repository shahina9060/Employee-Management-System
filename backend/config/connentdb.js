const mongoose =  require("mongoose");
const dotenv = require('dotenv').config();

const connectdb = async(url)=>{

    try {
       await mongoose.connect(url);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("MongoDB connection error:", error)
    }
}
module.exports = connectdb