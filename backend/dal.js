const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//if connecting with MongoClient

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "your_mongo_uri_here";
// let db = null;

// MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
//   console.log("Connected successfully to db server");

//   // connect to myproject database
//   db = client.db("drewsbankingapp");
// });

//connect with mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
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
    console.log(doc);
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

module.exports = { create, find, update, all, deleteUser };
