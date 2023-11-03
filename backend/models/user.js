const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true,

    },
    phoneNo:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    }
})



const User = mongoose.model('User', userSchema);

module.exports = {userSchema,User}
