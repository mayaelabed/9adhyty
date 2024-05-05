const express = require('express');
const router = express.Router();
const { register, login,logout} = require("../controller/authController");
const {checkAuth} = require("../middleware/authMiddleware");

//Register
router.post('/register',register);

//login
router.post('/login',login);

//logout
router.post("/logout",checkAuth,logout);

module.exports = router;