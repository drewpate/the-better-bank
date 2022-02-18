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

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Check for existing user in db,
 *     if no user, create one. Initialized with default balances.
 *     password gett's encrypted by the DAL.
 */

//create user
router.post("/", createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     description: Log user in with credentials
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *     responses:
 *       '200':
 *         description: User Data
 */
router.post("/login", userLogin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     descripttion: Retrieve all users in db
 *     responses: 200
 *        description: OK
 *
 *
 *
 */

//get all users
router.get("/", authMiddleWare, getAllUsers);

/**
 * @swagger
 * /api/users/:username:
 *   get:
 *     summary: Fetch user data
 *     description: Get all data for a specific user
 *     tags:
 *       - User
 *     parameters:
 *       - in: header
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: An authentication token which identifies and authorizes the user
 *     responses:
 *       '200':
 *         description: User Data
 */
router.get("/account/:username", authMiddleWare, getOneUser);

/**
 * @swagger
 * /api/users/:transactions:
 *   put:
 *      responses: 200
 *      description: OK
 *      summary: update checking or savings,
 *
 *
 *
 */

//update checking/savings
router.put("/transactions", authMiddleWare, updateUserBalance);

module.exports = router;
