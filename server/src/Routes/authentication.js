import userSchema from "../Database/Models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from "express";
const route = express.Router();

route.post("/signUp", async (req, res) => {
    const data = req.body;
    let newUser = {email: data.email, password: data.password}
    try {
        await validateEmail(newUser.email);
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
        newUser.password = hashedPassword;
        await userSchema.create(newUser);
        res.status(201).json({
            message: "User is registered successfully",
            success: true,
        });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});

route.post("/login", async (req, res) => {
    const userInput = req.body;
    try {
        const user = await userAuth(userInput.email, userInput.password);
        //JWT Token
        const tokenData = {
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn: 86400});
        console.log({token: token});
        //sending token in cookies
        res.cookie("sid",token);
        res.redirect("/");
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
});

async function validateEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(email)) {
        throw new Error("Invalid email");
    }
    const existingUser = await userSchema.findOne({
        where: {
            email: email
        }
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
}

async function userAuth(email, password) {
    const existingUser = await userSchema.findOne({
        where: {
            email: email
        }
    });
    if (!existingUser) {
        throw new Error("User does not exists");
    }
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
        throw new Error("Invalid Password");
    }
    return existingUser;
}

export default route;
