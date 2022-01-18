const express = require('express');
const router = express.Router();
const {validateUser} = require('../validations/user.validation');

authController = require("../controllers/auth.controller");
router.post('/register',validateUser('register'), authController.register);
router.post('/login',validateUser('login'), authController.login);


module.exports = router;
