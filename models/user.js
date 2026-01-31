import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  dateOfBirth: Date,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  bio: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  isActive: Boolean
});

const User = mongoose.model("User", userSchema);

export default User;