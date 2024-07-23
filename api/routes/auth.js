const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');


// Handle user registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with a customized user object (excluding the password)
    const { password: _, ...userWithoutPassword } = savedUser._doc;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

// LOGIN - With Password Hashing
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json("User not found");
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json("Incorrect password");
    }

    // Passwords match, send user data excluding the password
    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});


module.exports = router;
