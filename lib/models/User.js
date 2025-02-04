import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        default: 0
    },
    lastScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;