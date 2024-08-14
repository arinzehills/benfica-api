const userModel = require("../database/models/userModel");
const { login,register } = require("../services/authService")
const { errorResponse, successResponse } = require("../utils/custom_api.response");
const generateToken = require("../utils/generateToken");

const registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const { user, token } = await register(username, email, password);
        user.token=token
        return successResponse(res, "Registered successfully,", {user,token})
    } catch (error) {
        return errorResponse(res, error.statusCode, error.message)
    }
  };

const loginController = async (req , res)  => {
    try {
        const user = await  login(req.body)
    console.log("loggin here hitted")

        return successResponse(res, "Logged in successfully,", user)
    } catch (error) {
        return errorResponse(res, error.statusCode, error.message)
    }
}

const updateUserController=(async (req, res) => {
    await userModel.findByIdAndUpdate(req.user.id, req.body, {
      useFindAndModify: false,
    });
    var user = await userModel.findById(req.user.id).select('-password -posts').lean();
     user.token=generateToken(user._id)
    return res.status(200).json({
      success: true,
      message: "User data updated successfully 🙌 ",
      data: user,
    });
  });
module.exports={loginController,registerController,updateUserController}