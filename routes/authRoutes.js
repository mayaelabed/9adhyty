const express = require('express');
const router = express.Router();
const { register, login,logout,upload} = require("../controller/authController");
const {checkAuth} = require("../middleware/authMiddleware");

//Register
router.post('/register',upload,register);

//login
router.post('/login',login);

//logout
router.post("/logout",checkAuth,logout);

module.exports = router;