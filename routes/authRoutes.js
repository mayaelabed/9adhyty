const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();


//Register
router.post('/register',async (req,res)=>{
  try {

      const {email,password}=req.body;
      const user = new User({email,password});
      await user.save();
      res.status(201).send('User registered successfully');
  } catch (error) {
      res.status(400).send(error.message)
  }
})

//login
router.post('/login',async (req,res)=>{
  try {
      const {email,password}=req.body;
      const user = await User.findOne({email: email});
      if(!user){
          return res.status(404).send('user not found')
      }
      const isPasswordMatch =await bcrypt.compare(password,user.password);
      if(!isPasswordMatch){
          return res.status(401).send('invalid password')
      }
      const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
      res.send({token:token})
  } catch (error) {
      res.status(400).send(error.message)
  }});

/*
// User registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// User login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});*/

// User logout route (optional, as JWT is stateless)
// You can clear the client-side token to log out the user

module.exports = router;