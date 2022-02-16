const dal = require("../repositories/dal");
const jwt = require("jsonwebtoken");


async function userLogin(req, res) {
  const { username, password } = req.body;
  try {
    const user = await dal.userLogin(username, password);
    if (user) {
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      return res.status(200).json({ token: token, user: user });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

const getAllUsers = (req, res) => {
  dal.all(req.params).then((users) => {
    res.send(users);
    console.log(users);
  });
};

const getOneUser = (req, res) => {
  dal.findOne(req.params.username)

  .then((user) => 
  res.send((user))

  .catch(error => 
  res.status(500)
  
  .send(error)));
};

const updateUserBalance = (req, res) => {
  dal
    .updateUserBalance(
      req.body.username,
      req.body.checkingBalance,
      req.body.savingsBalance
    )
    .then((user) => {
      res.send(user);
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
  updateUserBalance,
  createUser,
};
