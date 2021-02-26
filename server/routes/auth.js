const express = require("express");

const router = express.Router();

// @router  GET api/auth
//@desc     Get a logged in a user
//@access   private
router.get("/", (req, res) => {
  res.send({ msg: "Get Logged in a user" });
});

// @router  POST api/auth
//@desc     Auth user and get a token
//@access   Public
router.post("/", (req, res) => {
  res.send({ msg: "Logged in a user" });
});

module.exports = router;
