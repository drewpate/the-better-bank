const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const authMiddleWare = require("../../middleware/auth-middleware");

dotenv.config();

const { userLogin } = require("../../controllers/users-controller");

//login user
router.post("/", userLogin);

module.exports = router;
