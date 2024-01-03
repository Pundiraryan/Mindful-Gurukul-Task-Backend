const express=require('express')
const User=require("../models/User")
const router =express.Router()
router.use(express.json());

const fetchUser=require("../middleware/fetchUser")

const{body,validationResult}=require('express-validator');
const myfuncs = require('../controllers/authController');





//ROUTE1:Create a User using: POST "/api/auth/createUser"  Doesnot require Auth
router.post('/createuser', [
   body('name', 'Enter a valid name').isLength({ min: 3}),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
 ], myfuncs.createuser);





 // ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', 

[
   body('email',"Enter a valid email").isEmail(),
   body('password', "Password cannot be blank").exists()
],myfuncs.loginUser)



//ROUTE3:Get logged  in User Details using: POST"/api/auth/getUser" Login required
router.post('/getUser', fetchUser,
myfuncs.getUserdetails)




module.exports=router