const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/api/users-route");
const authRouter = require("./routes/api/auth-route");

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(cors());

//express parser
app.use(express.json());

// use routes
app.use("/api/users", require("./routes/api/users-route"));
app.use("/api/users/auth", require("./routes/api/auth-route"));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
