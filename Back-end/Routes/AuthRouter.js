// routes.js

const { signup, login, updateProfile, adminLogin } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, updateProfileValidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require('../Middlewares/Auth');
const router = require('express').Router();


router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.put('/update-profile', ensureAuthenticated, updateProfileValidation ,  updateProfile);
router.post('/admin-login', adminLogin);

module.exports = router;


