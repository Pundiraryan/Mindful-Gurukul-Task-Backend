const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    default:"pass@123"
  },
  phone:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  },
  modified:{
    type:Boolean,
    default:false
  }
});
const User=mongoose.model('user',UserSchema) 
module.exports=User