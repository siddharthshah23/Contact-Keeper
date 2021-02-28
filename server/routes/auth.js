const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const auth = require("../../middleware/Auth");
const stripe = require("stripe")(
  "sk_test_51IOB8xHr9xsmMfAiaPK89B4zEq6Hftyl6WMDE2XXsRUb6bFHqMlNQF65eLZi5CIDoReBh6aejWoM6dU4PZIA6iF200sHOGcAQd"
);

// @router  GET api/auth
//@desc     Get a logged in a user
//@access   private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.find({ _id: req.user.id }).select("-password");
    console.log(user);
    const invoices = await stripe.invoices.list({
      customer: user.stripeid,
      status: "paid",
    });
    // console.log(user);
    res.json(invoices);
  } catch (error) {
    console.error(error.msg);
    res.status(500).send("Server error");
  }
});

// @router  POST api/auth
//@desc     Auth user and get a token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credenatials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credenatials" });
      }
      const payload = {
        user: {
          id: user.id,
          stripeid: user.stripeid,
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
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
