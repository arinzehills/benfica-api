// validators/postValidator.js
const { body } = require('express-validator');

const validatePost = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be longer than 100 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required'),

  
  body('assigned_to')
    .optional()
    .isMongoId()
    .withMessage('Assigned_to must be a valid MongoDB ObjectId'),
];

module.exports = validatePost;
