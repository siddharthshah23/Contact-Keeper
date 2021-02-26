const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(
  "sk_test_51IOB8xHr9xsmMfAiaPK89B4zEq6Hftyl6WMDE2XXsRUb6bFHqMlNQF65eLZi5CIDoReBh6aejWoM6dU4PZIA6iF200sHOGcAQd"
);

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already existst" });
      }

      const stripeUser = await stripe.customers.create({
        email,
      });

      const { id } = stripeUser;

      user = new User({
        name,
        email,
        password,
        id,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User saved");
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
