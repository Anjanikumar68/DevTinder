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
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("somthing went wrong");
  }
});

//delete user api
app.delete("/user", async (req, res) => {
  const userId = req.query.userId;
  try {
    const users = await User.findByIdAndDelete(userId);
    console.log(users);
    res.send("user deleted sucessfully!");
  } catch (error) {
    res.status(400).send("Somethings went wrong!");
  }
});

//Update a user api
app.patch("/user", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("String cannot be more then 10");
    }

    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send({
      msg: "Updated User Successfully",
      data: users,
    });
  } catch (err) {
    res.status(400).send("Something went Wrong!");
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
