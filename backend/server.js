const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/api/users-route");
const swaggerRoutes = require("./routes/api/swagger");

const PORT = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(cors());

//express parser
app.use(express.json());

// use routes
app.use("/api/users", userRouter);
//swagger
app.use("/api", swaggerRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
