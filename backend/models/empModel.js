const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  hireDate: {
    type: Date,
    required: true,
    // default: Date.now, // Default to current date if not provided
  },
  contactInformation: {
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true }); // Automatically create createdAt and updatedAt fields

const Employee = mongoose.model("Employee", empSchema);

module.exports = Employee;
