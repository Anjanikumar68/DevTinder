import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:pERp7I72V13CswDe@devtinder.y5t5nqm.mongodb.net/?appName=devTinder",
  );
};

export default connectDB;