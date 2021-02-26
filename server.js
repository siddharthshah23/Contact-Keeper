const express = require("express");
const connectDB = require("./config/db");
const stripe = require("stripe")(
  "sk_test_51IOB8xHr9xsmMfAiaPK89B4zEq6Hftyl6WMDE2XXsRUb6bFHqMlNQF65eLZi5CIDoReBh6aejWoM6dU4PZIA6iF200sHOGcAQd"
);

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

app.post("/api/test", (req, res) => {
  stripe.customers
    .create({
      email: "test@test3.ca",
    })
    // .then(res.send("succesfull"))
    .then((customer) => res.send(customer.id))
    .catch((error) => console.log(error));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
