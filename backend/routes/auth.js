const express = require("express");
const User = require("../models/User");
const router = express.Router();
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
const JWT_SECRET='welcome';
const fetchuser =require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //enadru errors idre input kodbekare this will show up
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
     const authdata=jwt.sign(data,JWT_SECRET)

    res.json({authdata});
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
    //enadru errors idre input kodbekare this will show up
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} =req.body;
    try{
      let user = await User.findOne({email});
     if(!user){
      return res.status(400).json({error:"user doesnot exists"});
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
     if(!passwordcompare){
     return res.status(400).json({error:"Enter correct password"})
    }
  const data={
    user: {
      id:user.id
    }
  }
   const authdata = jwt.sign(data,JWT_SECRET)

  res.json({authdata});
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
  userId=req.user.id;
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