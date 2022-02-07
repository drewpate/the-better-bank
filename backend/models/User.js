const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  $inc: { checkingBalance: { type: Number }, savingsBalance: { type: Number } },
});

module.exports = User = mongoose.model("user", UserSchema);
