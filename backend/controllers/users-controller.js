const dal = require("../repositories/dal");

const userLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  dal.userLogin(req.body.username, req.body.password).then((user) => {
    return res.status(200).json({ message: "Login successful" });
  });
};

const getAllUsers = (req, res) => {
  dal.all(req.params).then((users) => {
    res.send(users);
    console.log(users);
  });
};

const getOneUser = (req, res) => {
  dal.findOne(req.params.email).then((user) => {
    if (!user) return res.status(400).json({ msg: "No account found" });
    res.status(200).json({ msg: user });
  });
};

const updateUserBalances = (req, res) => {
  dal
    .updateUserBalances(
      req.body.username,
      req.body.checkingBalance,
      req.body.savingsBalance
    )
    .then(function (user) {
      res.send(req.body);
    });
};

const deleteUser = (req, res) => {
  dal.deleteUser(req.params.username).then((user) => {
    console.log(user);
    res.status(200).json({ msg: "account has been removed" });
  });
};

const createUser = (req, res) => {
  const { username, email, password } = req.body;

  //simple validation
  if (!username || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  dal.findOne(req.body.email).then((user) => {
    //If exists then error
    if (user)
      return res
        .status(400)
        .json({ msg: "There is already an account with this email" });

    //else create user
    dal
      .create(req.body.username, req.body.email, req.body.password)
      .then((user) => {
        res.status(200).json({ msg: "Account Successfully created" });
      });
  });
};

module.exports = {
  userLogin,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUserBalances,
  createUser,
};
