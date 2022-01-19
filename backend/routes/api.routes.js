const express = require('express');
const router = express.Router();
const { validateUser } = require('../validations/user.validation');

authController = require("../controllers/auth.controller");
router.post('/register', validateUser('register'), authController.register);
router.post('/login', validateUser('login'), authController.login);

profileController = require("../controllers/profile.controller");

router.get('/profile/:userId', validateUser('getProfile'), profileController.getProfile);


module.exports = router;
