// Importing necessary modules
import { Router } from "express"; // Importing the Router from Express for defining routes
import { createUser, getUser, loginUser } from "../controller/userController.mjs"; // Importing user controller functions
import authToken from "../utils/authToken.mjs"; // Importing middleware for token authentication

const userRouter = Router(); // Creating a new router instance

// Defining route for creating a user
userRouter.route('/createUser').post(createUser); // POST request to create a new user

// Defining route for user login
userRouter.route('/loginUser').post(loginUser); // POST request to log in a user

// Defining route for retrieving user details
userRouter.route('/get').get(authToken, getUser); // GET request to retrieve user details, requires token authentication

export default userRouter; // Exporting the user router for use in other parts of the application
