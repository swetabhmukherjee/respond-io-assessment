const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// User registration route
router.post('/register', userController.registerUser);
router.post('/validate-login', userController.validateLogin);

module.exports = router;
