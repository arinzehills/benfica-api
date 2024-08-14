const express = require('express');
const { loginController, registerController, updateUserController } = require('../controllers/authController');
const { signUpValidator,validate, loginValidator } = require('../validators/authValidator');
const authMiddleware = require('../middleware/authMiddleware');
// const loginController  = require('../controllers/authController');
// const { register, login } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register',signUpValidator, validate, registerController);
router.post('/login',loginValidator, validate, loginController);
router.post('/updateUser',authMiddleware, validate, updateUserController);

module.exports = router;
