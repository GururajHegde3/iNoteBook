const express = require("express");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');

const fetchuser =require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
    //enadru errors idre input kodbekare this will show up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }
 
  const salt=await bcrypt.genSalt(10)
  const secPass= await bcrypt.hash(req.body.password,salt);

   //idu already user with same email idre error will be displayed else user is created
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const data={
      user: {
        id:user.id
      }
    }
     const authtoken=jwt.sign(data,process.env.JWT_SECRET)
     success=true;
    res.json({success,authtoken});
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//login route
router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password needs to be entered').exists(),
], async (req, res) => {
  let success=false;
    //enadru errors idre input kodbekare this will show up
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password} =req.body;
    try{
      let user = await User.findOne({email});
     if(!user){
      success=false;
      return res.status(400).json({success,error:"user doesnot exists"});
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
     if(!passwordcompare){
      success=false;
     return res.status(400).json({success,error:"Enter correct password"})
    }
  const data={
    user: {
      id:user.id
    }
  }
   const authtoken = jwt.sign(data,process.env.JWT_SECRET)
   success=true;
  res.json({success,authtoken});
}
catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}



});

//get logged in user details.login required
router.post('/getuser',fetchuser,  async (req, res) => {

try{
  const userId=req.user.id;
  const user=await User.findById(userId).select("-password")
  res.send(user)

}
  catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  console.error(error);
  res.status(500).json({ error: 'Server error' });
}});

module.exports = router;