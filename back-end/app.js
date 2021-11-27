const dotenv = require("dotenv");

dotenv.config({ path: "back-end/config/config.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

const path = require("path");

//setting up config files
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());

app.use(cookieParser());

//import all routes.
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

app.use(`/api/v1`, products);
app.use(`/api/v1`, auth);
app.use(`/api/v1`, order);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.resolve(__dirname, "../front-end/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../front-end/build/index.html"));
  });
}

// error middlewares to handle errors
app.use(errorMiddleware);

module.exports = app;
