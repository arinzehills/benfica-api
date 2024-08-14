const Post = require("../database/models/postModel");
const User = require("../database/models/userModel");
  const postService = require('../services/postService.js');
const {
  successResponse,
  errorResponse,
} = require("../utils/custom_api.response");

exports.createPost = async (req, res) => {
  try { 
    const images = req?.files?.map((file) => file.path);
    const post = new Post({
      ...req.body,
      image_urls: images,
      assigned_to: req.user.id,
    });

        const user = await User.findById(post.assigned_to);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }
    
    await post.save();
    return successResponse(res, "Post created successfully", post);
  } catch (error) {
    return errorResponse(res, error.statusCode, error.message);
  }
};
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params; // Extract the post ID from the request parameters
    const images = req?.files?.map((file) => file.path); // Handle images if any
    
    // Find the post by ID
    const post = await Post.findById(id);
    
    if (!post) {
      return errorResponse(res, 404, "Post not found");
    }
    // Check if the current user is the owner of the post
    if (post.assigned_to.toString() !== req.user.id.toString()) {
      return errorResponse(res, 403, "You are not authorized to update this post");
    }
    // Update fields
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.status = req.body.status || post.status;
    
    // Update image URLs if new images are provided
    if (images.length > 0) {
      post.image_urls = images;
    }
    
    // Optional: If you want to update the assigned user
    if (req.body.assigned_to) {
      const oldUser = await User.findById(post.assigned_to);
      if (oldUser) {
        oldUser.posts.pull(post._id); // Remove the post from the old user's posts array
        await oldUser.save();
      }
      
      post.assigned_to = req.body.assigned_to;
      
      const newUser = await User.findById(post.assigned_to);
      if (newUser) {
        newUser.posts.push(post._id); // Add the post to the new user's posts array
        await newUser.save();
      }
    }
    
    // Save the updated post
    await post.save();
    
    return successResponse(res, "Post updated successfully", post);
  } catch (error) {
    return errorResponse(res, error.statusCode || 500, error.message || "Server Error");
  }
};

exports.getPosts = async (req, res) => {
    try {
      // Get page and limit from query parameters with default values
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Calculate the starting index of the posts for the current page
      const startIndex = (page - 1) * limit;
  
      // Fetch the posts with pagination
      const posts = await Post.find()
        .populate("assigned_to")
        .skip(startIndex)
        .limit(limit);
  
      // Get the total count of posts for pagination purposes
      const totalPosts = await Post.countDocuments();
  
      res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts: totalPosts,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.getSinglePost = async (req, res) => {
    try {
        if(!req.params.id)   return errorResponse(res,400, "Post ID required", )
        const post = await Post.findById(req.params.id).populate('assigned_to');
        if(!post)  return errorResponse(res,400, "Post not Found", ) 
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.likePostController = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user.id;
  
    if (!postId) {
      return errorResponse(res, 400, "Post ID required");
    }
  
    try {
      const message = await postService.likePost(postId, userId);
      res.status(200).json({
        success: true,
        message,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, 500, "An error occurred while processing your request");
    }
  };

  exports.addCommentController = async (req, res) => {
      try {
          const { postId } = req.params;
          const {  comment } = req.body;
          if(!comment) return errorResponse(res,400,"Comment is required",)
          const userId=req.user.id;
          // Call the service to add the comment
          const updatedPost = await postService.addComment(postId, { userId, comment });
  
          if (!updatedPost) {
              return res.status(404).json({ message: 'Post not found' });
          }
        //   return successResponse()
          res.status(200).json(updatedPost);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
  };
  exports.deletePostController = async (req, res) => {
    const postId = req.params.postId;
  
    if (!postId) {
      return errorResponse(res, 400, "Post ID required");
    }
  
    try {
      const message = await postService.deletePost(postId);
      res.status(200).json({
        success: true,
        message,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, 500, "An error occurred while processing your request");
    }
  };
// Add update and delete operations...
