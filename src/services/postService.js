const Post = require('../database/models/postModel');
const { loggingItem } = require('../utils/loggingItem');

exports.addComment = async (postId, commentData) => {
    try {
        // Find the post by ID
        const post = await Post.findById(postId);

        if (!post) {
            return null;
        }

        // Add the new comment to the comments array
        post.comments.push({
            user: commentData.userId,
            comment: commentData.comment,
            timestamp: new Date(),
        });

        // Save the updated post
        await post.save();

        return post;
    } catch (error) {
        throw new Error('Error adding comment to post');
    }
};
exports.likePost= async (postId,userId) => {
    try {
        const post = await Post.findById(postId);
        loggingItem("userId")
        loggingItem(post)
        if (!post) {
          throw new Error('Post not found');
        }
    
        await post.updateOne({ $inc: { likes: 1 } });
         return 'Post has been liked 🙌';
      } catch (err) {
        throw new Error(err.message);
      }
}
exports.deletePost = async (postId) => {
    try {
      const result = await Post.deleteOne({ _id: postId });
      if (result.deletedCount === 0) {
        throw new Error('Post not found');
      }
      return 'Post has been deleted successfully';
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
