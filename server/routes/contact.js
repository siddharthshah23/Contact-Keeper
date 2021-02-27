const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../modals/User");
const Contact = require("../modals/Contact");
const auth = require("../../middleware/Auth");

const router = express.Router();

//@router  GET api/contact
//@desc     Get all user contact
//@access   private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//@router  POST api/contact
//@desc     Create a new contact
//@access   private
router.post(
  "/",
  [auth, [check("name", "Name is required").notEmpty()]],
  (req, res) => {
    res.send({ msg: "Add a new user" });
  }
);

//@router  GET api/contact/:id"
//@desc     Edit a user
//@access   private
router.put("/:id", (req, res) => {
  res.send({ msg: "Edit a user" });
});

//@router  Delete api/user:id
//@desc     Delete a contact
//@access   private
router.delete("/:id", (req, res) => {
  res.send({ msg: "Delete a user" });
});

module.exports = router;
