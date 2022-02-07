const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

//connect with mongoose
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

const db = mongoose.connection;

//create new user. this is a refactor to async await syntax
async function create(username, email, password) {
  const collection = await db.collection("user");
  const doc = {
    username,
    email,
    password,
    checkingBalance: 0,
    savingsBalance: 0,
  };
  try {
    //create salt & hash
    const salt = await bcrypt.genSalt(10);
    doc.password = await bcrypt.hash(doc.password, salt);
    return collection.insertOne(doc, { w: 1 });
  } catch (err) {
    throw new Error(err.message);
  }
}

//get all users this is a refactor to async await syntax

async function all() {
  try {
    return db.collection("user").find({}).toArray();
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
//get one user by email. this is a refactor to async await syntax

async function find(email) {
  try {
    return db.collection("user").find({ email: email }).toArray();
  } catch {
    console.log(err);
    throw new Error(err.message);
  }
}

// // find user account
// function findOne(email) {
//   return new Promise((resolve, reject) => {
//     const customers = db
//       .collection("users")
//       .findOne({ email: email })
//       .then((doc) => resolve(doc))
//       .catch((err) => reject(err));
//   });
// }

async function findOne(email) {
  try {
    return db.collection("user").findOne({ email });
  } catch {
    console.log(err);
    throw new Error(err.message);
  }
}

async function update(username, amount) {
  try {
    await db
      .collection("user")
      .findOneAndUpdate(
        { username },
        { $inc: { checkingBalance: amount } },
        { returnOriginal: false }
      );
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

async function deleteUser(username) {
  try {
    return db
      .collection("user")
      .deleteOne(
        { username },
        { returnOriginal: false },
        { returnNewDocument: true }
      );
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

module.exports = { create, find, findOne, update, all, deleteUser };
