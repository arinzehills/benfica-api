const User = require("../database/models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");


const register  = async (username, email, password) => {
    const userExists = await User.findOne({ email });
  
    if (userExists) {
        const error = new Error('User already exists');
        error.statusCode = 409;
      throw error;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
  
    const createUser = await User.create({ username, email:email.toLowerCase(), password:encryptedPassword });
    const user=await User.findById(createUser._id).lean()
    const token = generateToken(user._id);
    user.token=token;
    return { user, token };
  };

const login = async (body) => { 
    const { email, password } =  body;
 
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (user && (await user.matchPassword(password))) {
        var newUser=await User.findById(user._id).select('-password -posts').lean()
        const token = generateToken(user._id);
        newUser.token=token 
        return newUser
    } else {
        const error = new Error('Invalid email/phone or password');
        error.statusCode = 404;
         throw error;
    }
}

module.exports= {login,register};