import express from "express";

const app = express();

app.get("/user", (req, res) => {
  res.send({ name: "kunal", age: 23 });
});

app.post("/user", (req, res) => {
  res.send("data successfuly saved to the database");
});

let user = {
  name: "kunal",
  age: 23,
};

app.put("/user", (req, res) => {
  user.name = "Anjani";
  user.age = 25;

  res.send(user);
});

app.patch("/user", (req, res) => {
  user.name = "Jay";

  res.send(user);
});

app.delete("/user", (req,res) => {
  res.send("user delete sucessfully!");
});

app.listen(3000, () => {
  console.log("server is running on port 3000 sucessfully!");
});
