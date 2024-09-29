const mongoose = require('mongoose');

const userdata = new mongoose.Schema({
    username:{
        type: String,
        requred: true
    },
    email:{
        type: String,
        requred: true
    },
    password:{
        type: String,
        requred: true
    },
    confirmPassword:{
        type: String,
        require: true
    }

})

module.exports = mongoose.model('User',userdata);