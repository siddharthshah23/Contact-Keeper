const express = require("express");

const router = express.Router();

//@router  GET api/contact
//@desc     Get all user contact
//@access   private
router.get("/", (req, res) => {
  res.send({ msg: "get a contact" });
});

//@router  POST api/contact
//@desc     Create a new contact
//@access   private
router.post("/", (req, res) => {
  res.send({ msg: "Add a new user" });
});

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
