const express = require('express');
const { createPost, getPosts, addCommentController, getSinglePost, likePostController, deletePostController, updatePost } = require('../controllers/postController.js');
const validatePost = require('../validators/postValidator.js');
const { validate } = require('../validators/authValidator.js');
const upload = require('../middleware/upload.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = express.Router();

router.post('/',authMiddleware,upload.array('images', 5),validatePost,validate, createPost);
router.post('/updatePost/:id',authMiddleware,upload.array('images', 5),validatePost,validate, updatePost);
router.get('/',authMiddleware, getPosts);
router.get('/:id',authMiddleware, getSinglePost);
router.post('/:postId/comments',authMiddleware, addCommentController);
router.post('/:postId/like',authMiddleware, likePostController);
router.delete('/:postId', deletePostController);

module.exports = router;
