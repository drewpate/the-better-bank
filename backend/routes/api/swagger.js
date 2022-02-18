var express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Better Bank",
      version: "1.0.0",
    },
  },
  apis: ["./routes/api/*.js"], // Wherever your API calls are (user controller maybe?)
});
const router = express.Router();

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerSpec));

module.exports = router;
