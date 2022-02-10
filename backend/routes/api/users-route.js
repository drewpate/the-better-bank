const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const authMiddleWare = require("../../middleware/auth-middleware");

const {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUserBalances,
  createUser,
} = require("../../controllers/users-controller");

dotenv.config();

//create user
router.post("/", createUser);

//get all users
router.get("/", getAllUsers);

//find one user
router.get("/:email", getOneUser);

//update checking/savings
router.put("/:username", updateUserBalances);

//delete user account
router.delete("/:username", authMiddleWare, deleteUser);

module.exports = router;
