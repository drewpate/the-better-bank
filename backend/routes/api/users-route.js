const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const {
  authMiddleWare,
  checkUser,
} = require("../../middleware/auth-middleware");

const {
  userLogin,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUserBalance,
  createUser,
} = require("../../controllers/users-controller");

dotenv.config();

//create user
router.post("/", createUser);

//login user
router.post("/login", userLogin);

//get all users
router.get("/", authMiddleWare, getAllUsers);

//find one user
router.get("/account/:username", authMiddleWare, getOneUser);

//update checking/savings
router.put("/transactions", authMiddleWare, updateUserBalance);

//delete user account
router.delete("/:username", authMiddleWare, deleteUser);

module.exports = router;
