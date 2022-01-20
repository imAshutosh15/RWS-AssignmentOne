const express = require('express');
const router = express.Router();
const { validateUser } = require('../validations/user.validation');

const authController = require("../controllers/auth.controller");
router.post('/register', validateUser('register'), authController.register);
router.post('/login', validateUser('login'), authController.login);

const profileController = require("../controllers/profile.controller");
router.get('/profile/:userId', validateUser('getProfile'), profileController.getProfile);

const usersController = require("../controllers/users.controller");
router.get('/usersList', usersController.usersList);

module.exports = router;
