const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config();

//connect with mongoose
try {
  mongoose.connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Connected to MongoDB")
  );
} catch (e) {
  console.log("there was a problem connecting to MONGODB");
}

const db = mongoose.connection;

//create new user
async function create(username, email, password) {
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error("Something went wrong with bcrypt");

  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error("Something went wrong hashing the password");

  const newUser = new User({
    username,
    email,
    password: hash,
  });

  const savedUser = await newUser.save();

  if (!savedUser) throw Error("Something went wrong saving the user");
}

async function userLogin(username, password) {
  const user = await User.findOne({ username });
  if (!user) throw Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw Error("Invalid credentials");

  return user;
}

//get all users
async function all() {
  try {
    return await User.find({});
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

//find by email, not sure yet how this is different from findOne
async function find(email) {
  try {
    return db.collection("users").find({ email: email }).toArray();
  } catch {
    console.log(err);
    throw new Error(err.message);
  }
}

//get one user by username.
function findOne(username) {
  return User.findOne({ username });
}

//update user checking/savings
async function updateUserBalance(username, checkingAmount, savingsAmount) {
  const update = await User.findOneAndUpdate(
    { username },
    {
      $inc: {
        checkingBalance: checkingAmount,
        savingsBalance: savingsAmount,
      },
    },
    { returnOriginal: false }
  );
  return update;
}

// //update user checking/savings
// function updateUserBalance(username, checkingAmount, savingsAmount) {
//   let update = {};
//   if (checkingAmount || parseFloat(checkingAmount) === 0) {
//     update.checkingAmount = checkingAmount;
//   }
//   if (savingsAmount || parseFloat(savingsAmount) === 0) {
//     update.savingsAmount = savingsAmount;
//   }
//   return User.findOneAndUpdate({ username }, update, { returnOriginal: false });
// }

//delete one user
async function deleteUser(username) {
  try {
    return User.deleteOne(
      { username },
      { returnOriginal: false },
      { returnNewDocument: true }
    );
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

module.exports = {
  create,
  find,
  findOne,
  updateUserBalance,
  all,
  deleteUser,
  userLogin,
};
