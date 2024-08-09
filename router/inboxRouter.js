const express = require("express");
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const router = express.Router();
//login page
router.get("/", decorateHtmlResponse("inbox"), getInbox);

module.exports = router;
