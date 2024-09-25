import { encryptdata, comparedata } from '../Middlewares/encrypt.middlewares.js'

import jwt from 'jsonwebtoken';
import userModel from "../Models/userModal.js";
import isAuthenticated from '../Middlewares/auth.middlewares.js';


const registerAction = async (req, res) => {
    var {
        // firstname,
        // lastname,
        username,
        // usermobile,
        useremail,
        userpass,
        // userProfile
    } = req.body

    var userpass = encryptdata(userpass)
    console.log(userpass);


    const dataToInsert = {
        // firstname: firstname,
        // lastname: lastname,
        username: username,
        // usermobile: usermobile,
        useremail: useremail,
        userpass: userpass,
        // userProfile
    }

    console.log(dataToInsert);

    try {

        // Check if email already exists
        const existingUser = await userModel.findOne({ useremail: useremail });

        console.log(existingUser);


        if (existingUser) {
            return res.status(409).send({ status: false, msg: "Email Id Exists" });
        }

        const userRegisterInstances = new userModel(dataToInsert)
        var ansAfterInsert = await userRegisterInstances.save();
        res.status(200).send({ status: true, message: "User Registered", data: ansAfterInsert })
    }
    catch (err) {
        res.status(500).send({ status: false, message: "Error", err })
        console.log(err);

    }
}
const loginAction = async (req, res) => {
    const { useremail, userpass, username } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ useremail: useremail });

        if (!user) {
            console.log("User not found");
            return res.status(404).send({ msg: "User not found" });
        }

        console.log("User found: ", user);

        // Compare the provided password with the stored hashed password using comparedata function
        const isMatch = comparedata(user.userpass, userpass);



        if (!isMatch) {
            // Passwords do not match, return early
            return res.status(401).send({ msg: "Invalid credentials" });
        }

        // If passwords match, create token and set cookie
        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true })
        .json({ message: `Welcome back ${user.username}`, success: true })
    }


    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Server error", error });
    }
};

const logOutAction = (req, res) => {
    res.cookie("token", "", { expires: new Date(Date.now()) }).json({
        message: "User Logged Out Successfully"
    });

}

export {
    registerAction,
    loginAction,
    logOutAction
};