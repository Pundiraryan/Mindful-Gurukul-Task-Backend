const User = require("../models/User");
const bcrypt = require('bcrypt');
const fetchUser=require("../middleware/fetchUser")



var jwt = require('jsonwebtoken');

const{body,validationResult}=require('express-validator');

const createuser=async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
           let user = await User.findOne({ email: req.body.email });
           if (user) {
             return res.status(400).json({ error: "Sorry a user with this email already exists" })
           }
           const salt = await bcrypt.genSalt(10);
           const secPass = await bcrypt.hash(req.body.password, salt);
       
           // Create a new user
           user = await User.create({
             name: req.body.name,
             password: secPass,
             email: req.body.email,
             phone:req.body.phone
           });
           const data = {
             user: {
               id: user._id
             }
           }
           const authtoken = jwt.sign(data, process.env.JWT_SECRET);
       
           // res.json(authtoken) returning our authoken
      res.json({ authtoken })
  
    }
   catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
  const loginUser=async (req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 
    const {email,password}=req.body;
 
    try{
       let user=await User.findOne({email:req.body.email})
       if(!user){
         return res.status(400).json({error:"Please try to login using correct credentials"})
       }
       const passwordCompare=bcrypt.compareSync(password,user.password)
       if(!passwordCompare){
         return res.status(400).json({error:"Please try to login using correct credentials"})
       }
 
       const data = {
         user: {
           id: user._id
         }
       }
       const authtoken = jwt.sign(data, procss.env.JWT_SECRET);
       console.log(authtoken);
       res.json({ authtoken });
    }
    catch(error){
     console.error(error.message);
     res.status(500).send("Internal Server Error")
    }
  
 }
 
 const getUserdetails=async (req,res)=>{
    try {
        let userId=req.user.id
        const user=await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
}
}
  module.exports={createuser,loginUser,getUserdetails}