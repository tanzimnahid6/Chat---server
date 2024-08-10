const express = require("express");
const createError = require("http-errors");
const { check } = require("express-validator");
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");

const router = express.Router();

const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/userValidatore");
const avatarUpload = require("../middleware/users/avataerUpload");

//login page
router.get("/", decorateHtmlResponse("users"), getUsers);

//add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
