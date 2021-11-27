const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// new user signUp
router.route("/register").post(registerUser);

// existing user login.
router.route("/login").post(loginUser);

//forgot password email route.
router.route("/password/forgot").post(forgotPassword);

//reset password email route.
router.route("/password/reset/:token").put(resetPassword);

// logout.
router.route("/logout").get(logout);

// user profile
router.route("/me").get(isAuthenticatedUser, getUserProfile);

// update user profile.
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//update password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// admin access all user route.
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

// admin access to specific user.
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);

// admin access and update user profile.
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);

// admin access and Delete user profile.
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
