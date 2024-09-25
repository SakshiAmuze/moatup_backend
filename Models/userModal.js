import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({

    // firstname: String,
    // lastname: String,
    username: String,
    // usermobile: Number,
    useremail: String,
    userpass: String,
    // userProfile: String,

    timestamp: { type: Date, default: Date.now }
})

const userModel = mongoose.model('users', userSchema);

export default userModel;