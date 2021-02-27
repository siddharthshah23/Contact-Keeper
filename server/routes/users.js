const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(
  "sk_test_51IOB8xHr9xsmMfAiaPK89B4zEq6Hftyl6WMDE2XXsRUb6bFHqMlNQF65eLZi5CIDoReBh6aejWoM6dU4PZIA6iF200sHOGcAQd"
);
const config = require("config");

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
      // Stripe Part
      const stripeUser = await stripe.customers.create({
        email,
      });

      const stripeid = stripeUser.id;

      user = new User({
        name,
        email,
        password,
        stripeid,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
          stripeid,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Testing Stripe Part

// router.get("/:id", async (req, res) => {
//   try {
//     const invoices = await stripe.invoices.list({
//       customer: req.header,
//       status: "open",
//     });
//     //console.log(invoices);
//     res.send(invoices);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

module.exports = router;
