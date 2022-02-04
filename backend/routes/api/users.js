const express = require("express");
const router = express.Router();
const dal = require("../../controllers/dal");

//create new user
router.post("/create/:username/:email/:password", (req, res) => {
  dal
    .create(req.params.username, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.json(user);
    });
});

//get all users
router.get("/all", (req, res) => {
  dal.all(req.params).then((users) => {
    console.log(users);
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
