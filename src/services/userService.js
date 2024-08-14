const User = require('../database/models/userModel');
const Post = require('../database/models/postModel');
const { formatCount } = require('../utils/formatCount');
const userModel = require('../database/models/userModel');



const getUserDetails = async (userId) => {
    try {
        // Fetch user details
        const user = await User.findById(userId)
            .populate('followers')
            .populate('posts')
            .exec();

        if (!user) {
            const error = new Error('User not found');
        error.statusCode = 409;
                throw error; 
        }
        const unpopulateUser = await User.findById(userId);
        // Calculate total likes
        const posts = await Post.find({ _id: { $in: user.posts } });
        const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);

        // Format followers and likes count
        const formattedFollowers = formatCount(user.followers.length);
        const formattedLikes = formatCount(totalLikes);

        return {
            _id:user.id,
            username: user.username,
            email: user.email,
            profile_picture: user.profile_picture,
            totalFollowers: formattedFollowers,
            followers: unpopulateUser.followers,
            populatedFollowers: user.followers,
            totalLikes: formattedLikes,
            posts: user.posts,
        };
    } catch (error) {
        throw error;
    }
};

const toggleFollowUser = async (userId, followUserId) => {
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);
 
    if (!user || !followUser) {
        throw new Error('User not found');
    }

    try { 
        if (!user.followers.includes(followUserId)) {
          //user_id is id of user that wants to like a user
          console.log("user already subscribe to user");
          await user.updateOne({ $push: { followers: followUser.id } });
          return { message: "You have subscribed to this user 🙌" };
        } else {
          await user.updateOne({ $pull: { followers: followUser.id } });
          return { message: "You have unsubscribed to this user" };
        }
      } catch (err) {
        console.log(err);
      }
    // return {
    //     message: isFollowing ? 'User unfollowed successfully' : 'User followed successfully',
    //     isFollowing: !isFollowing,
    // };
};

module.exports = {
    getUserDetails,toggleFollowUser
};
