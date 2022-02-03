const express = require("express");
const cors = require("cors");
const dal = require("./dal");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(cors());

//express parser
app.use(express.json());

//use routes
// app.use("/api/user", users);

//connect dal to express
app.post("/account/create/:username/:email/:password", function (req, res) {
  //else create user
  dal
    .create(req.params.username, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.json(user);
    });
});

//get all users
app.get("/account/all", function (req, res) {
  dal.all(req.params).then((users) => {
    console.log(users);
    res.send(users);
  });
});

//get user by email
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((users) => {
    console.log(users);
    res.send(users);
  });
});

//update user account
app.put("/account/update/:username", function (req, res) {
  dal.update(req.body.username, req.body.checkingBalance).then(function (user) {
    res.send(req.body);
  });
});

//delete user account
app.delete("/account/delete/:username", function (req, res) {
  dal.deleteUser(req.params.username).then((user) => {
    console.log(user);
    res.json(user);
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
