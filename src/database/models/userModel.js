const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require:true },
    profile_picture: { type: String, default:''},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('User', userSchema);
