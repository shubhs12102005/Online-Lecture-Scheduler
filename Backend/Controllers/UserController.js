import { User } from "../Models/UserModel.js"
import { generateToken } from "../Utils/generateToken.js";

// Controller for Register
export const register = async (req, res) => {
    try {
        // Destructuring from body
        const { name, email, password, role } = req.body;

        // If any fields are empty
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // If user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = {
            name,
            email,
            password,
            role
        }
        await User.create(newUser);

        generateToken(res, newUser, `Welcome ${newUser.name}`)

        // return res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        console.log("Error while creating user: ", error);
        return res.status(500).json({ message: "Failed to create User" });
    }
}

// Controller for Login
export const login = async (req, res) => {
    try {
        // Destructuring from body
        const { email, password } = req.body;

        // If any fields are empty
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // If user not exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: "User not exists" });
        }

        // If password doesn't match
        if (password !== existingUser.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        generateToken(res, existingUser, `Welcome Back ${newUser.name}`)

        // return res.status(200).json({ message: "User successfully login" });

    } catch (error) {
        console.log("Error while creating user: ", error);
        return res.status(500).json({ message: "Failed to create User" });
    }
}

// Controller for Logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", {
            maxAge: 0
        }).json({
            message: "User Logged Out Successfully"
        })

    } catch (error) {
        console.log("Error while creating user: ", error);
        return res.status(500).json({ message: "Failed to create User" });
    }
}