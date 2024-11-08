// Importing necessary modules
import { sendResponse } from "../utils/response.mjs"; // Utility for sending standardized responses
import models from "../models/index.mjs"; // Importing database models
import bcrypt from "bcrypt"; // Library for hashing passwords
import jwt from "jsonwebtoken"; // Library for creating JSON Web Tokens

const salt = 10; // Salt rounds for password hashing
const secret = "1234"; // Secret key for signing JWTs

// Function to create a new user
export const createUser = async (req, res) => {
    try {
        const { password } = req.body;

        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;
        if (!password || !passwordRequirements.test(password)) {
            return sendResponse(res, 400, false, "Password must be 8 characters long, at least one uppercase,one lowercase,one special character,and one number.");
        }
        // Hash the user's password
        const hash = await bcrypt.hash(req.body.password, salt);
        
        // Create a user object with the hashed password
        const userData = { ...req.body, password: hash }; 

        // Save the new user to the database
        let response = await models.User.create(userData);
        // Send a success response
        sendResponse(res, 201, true, "User created successfully", response);
    } catch (error) {
        console.error('Create User Error', error); // Log error
        // Send an error response
        sendResponse(res, 500, false, "Internal server error");
    }
}

// Function to log in a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Get email and password from request

        // Find the user by email
        const user = await models.User.findOne({ email }).lean();
        if (!user) {
            
            // If user not found, return error
            return res.status(400).json({ success: false, message: 'Invalid email ' });
        }

        // Check if the provided password matches the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If password is incorrect, return error
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }
        // Create a JWT token with user information
        const token = jwt.sign({ id: user._id, email: user.email }, secret, );    //{ expiresIn: "1h" }

        // Send a success response with user data and token
        res.status(200).json({ success: true, message: 'Login successfully', user: { ...user, token } });
    } catch (error) {
        console.error('Login Error', error); // Log error
        // Send an error response
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Function to retrieve user details
export const getUser = async (req, res, next) => {
    try {
        const id = req.query.id; // Get user ID from query parameters

        // Check if ID is provided
        if (!id) {
            return res.status(400).json({ success: false, message: 'Id is required' });
        }

        // Find the user by ID
        const user = await models.User.findById(id);
        if (!user) {
            // If user not found, return error
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Send a success response with user data
        res.status(200).json({ success: true, message: 'User retrieved successfully', user });
    } catch (error) {
        console.log(error, '======'); // Log error
        // Send an error response
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
  