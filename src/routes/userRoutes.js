const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', userController.getUserDetails);
router.post('/:id/follow',authMiddleware, userController.toggleFollow);

module.exports = router;
