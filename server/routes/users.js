const express = require("express");

const router = express.Router();

// @router  POST api/user
//@desc     REGISTER A USER
//@access   PUBLIC
router.post("/", (req, res) => {
  res.send({ msg: "Register a user" });
});

module.exports = router;
