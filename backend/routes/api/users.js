const express = require("express");
const router = express.Router();
const dal = require("../../controllers/dal");
const dotenv = require("dotenv");

dotenv.config();

//  @route POST /users/create
//  @desc  Create User Account
//  @access Public
//  create new user
router.post("/create", (req, res) => {
  //Check for existing user
  dal.findOne(req.body.email).then((user) => {
    dal
      .create(req.body.username, req.body.email, req.body.password)
      .then((user) => {
        res.status(200).json({ msg: "Account Successfully created" });
      });
  });
});

//  @route POST /users/login
//  @desc  Login to User Account
//  @access Public
//login
router.post("/login", (req, res) => {
  dal.login(req.body.username, req.body.password).then((user) => {
    res.json({ status: "ok", user: true });
  });
});

//get all users
router.get("/all", (req, res) => {
  dal.all(req.params).then((users) => {
    res.send(users);
  });
});

//get one user by email
router.get("/find/:email", (req, res) => {
  dal.find(req.params.email).then((user) => {
    res.status(200).json(user);
  });
});

//update checking
router.put("/update/:username", (req, res) => {
  dal.update(req.body.username, req.body.checkingBalance).then(function (user) {
    res.send(req.body);
  });
});

//delete user account
router.delete("/delete/:username", (req, res) => {
  dal.deleteUser(req.params.username).then((user) => {
    console.log(user);
    res.status(200).json({ msg: "account has been removed." });
  });
});

module.exports = router;
