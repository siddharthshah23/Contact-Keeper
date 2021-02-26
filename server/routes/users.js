const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

// @router  POST api/user
//@desc     REGISTER A USER
//@access   PUBLIC
router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with minimum 8 character"
    ).isLength({ min: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
