const { body, validationResult } = require('express-validator');

const signUpValidator = [
  body('username')
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ min: 2 })
    .withMessage('user name must be at least 2 characters long'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long'),
];

const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  signUpValidator,
  loginValidator,
  validate,
};
