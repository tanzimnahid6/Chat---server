//get users page
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const User = require("../model/people");
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users.ejs", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

const addUser = async (req, res, next) => {
  let newUser;
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPass,
    });
  }

  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "user was added successfully",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "uncrowned error occurred",
        },
      },
    });
  }
};
async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

module.exports = { getUsers, addUser, removeUser };
