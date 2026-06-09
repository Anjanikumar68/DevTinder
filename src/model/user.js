import mongoose, { SchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique:true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min:18,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/045/711/185/non_2x/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg",
    },
    about: {
      type: String,
      default: "This is the default about of the user!",
    },
    skills:{
      type: [String],
    },
  },
  { timestamps: true },
);

// const User =
export default mongoose.model("User", userSchema);
