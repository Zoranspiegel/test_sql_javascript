const signupUser = require('./signupUser');
const loginUser = require('./loginUser');
const getProfile = require('./getProfile');
const createPost = require('./createPost');
const getUserPosts = require('./getUserPosts');
const getFeedPosts = require('./getFeedPosts');
const getPostById = require('./getPostById');
const patchPost = require('./patchPost');
const deletePost = require('./deletePost');
const getFollowingUsers = require('./getFollowingUsers');
const getFollowerUsers = require('./getFollowerUsers');
const logoutUser = require('./logoutUser');

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  createPost,
  getUserPosts,
  getFeedPosts,
  getPostById,
  patchPost,
  deletePost,
  getFollowingUsers,
  getFollowerUsers,
  logoutUser
};
