import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userID: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: Object, default: {} }, 
    fitnessData: { type: Object, default: {} }
});

const User = mongoose.model("User", userSchema);
export default User;

