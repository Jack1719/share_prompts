import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email is already registered!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    unique: [true, "Username is already registered!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid, it should be 8-20 characters long, can only contain letters, numbers, underscores and dots, and cannot start or end with an underscore or dot!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;