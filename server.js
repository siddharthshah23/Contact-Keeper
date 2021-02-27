const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Databse

connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send({ msg: "Welecome to ContactKeeper API" }));

// Define Routes

app.use("/api/users", require("./server/routes/users"));
app.use("/api/auth", require("./server/routes/auth"));
app.use("/api/contact", require("./server/routes/contact"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
