const uploader = require("../../utils/singleUpload");


function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpg", "image/png", "image/jpeg"],
    1000000,
    "Only .png / .jpg / .jpeg file allowed"
  );
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        error: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
    
      next();
    }
  });
}

module.exports = avatarUpload;
