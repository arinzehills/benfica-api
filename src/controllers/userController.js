const userService = require('../services/userService');
const { errorResponse, successResponse } = require('../utils/custom_api.response');

const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDetails = await userService.getUserDetails(userId);
        return successResponse(res, "Success,", userDetails)
    } catch (error) {
        return errorResponse(res, error.statusCode, error.message)
    }
};
const toggleFollow = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id  
        console.log(userId)
        const result = await userService.toggleFollowUser(userId, id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    getUserDetails,
    toggleFollow
};
