//get users page
const bcrypt = require("bcrypt");
const User = require("../model/people");
function getUsers(req, res, next) {
  res.render("users.ejs");
}

const addUser = async (req, res, next) => {

  let newUser;
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].fileName,
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

module.exports = { getUsers, addUser };
