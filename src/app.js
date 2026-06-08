import express from "express";
import connectDB from "./config/database.js";
import User from "./model/user.js";
import user from "./model/user.js";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user data saved successfully!");
  } catch (err) {
    res.status(400).send("error on user data saving" + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Somthing went wrong");
  }
});

// Feed API get /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await  User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established!");

    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
