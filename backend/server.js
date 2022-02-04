const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(cors());

//express parser
app.use(express.json());

const userRouter = require("./routes/api/users");
// //use routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
