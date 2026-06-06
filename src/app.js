import express from "express";
import connectDB from "./config/database.js";
import User from "./model/user.js";

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
