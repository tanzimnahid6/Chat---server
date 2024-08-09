//external import
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const ejs = require("ejs");
require("dotenv").config();
const PORT = process.env.PORT || 9000;

//Internal import
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/common/errorHandler");

const loginRouter = require("./router/loginRouter")
const usersRouter = require("./router/usersRouter")
const inboxRouter = require("./router/inboxRouter");


//Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected successful to DB...");
  })
  .catch((err) => {
    console.log(`Connection error :${err}`);
  });
console.log("NODE_ENV:", process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set view engine
app.set("view engine", ejs);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//set cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup =======================================main=================================================
app.use("/",loginRouter)
app.use("/users",usersRouter)
app.use("/inbox",inboxRouter)


//404 not found error handling
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

// listening app
app.listen(PORT, () => {
  console.log("App listing to port ", PORT);
});
