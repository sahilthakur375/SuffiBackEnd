// Importing the jsonwebtoken library for handling JWTs
import jwt from "jsonwebtoken";

const jwtSecretKey = "1234"; // Secret key for signing tokens (consider using an environment variable for security)

// Middleware function to authenticate token
function authToken(req, res, next) {
    try {
        console.log('===here'); // Log to indicate function execution
        const authHeader = req.header('Authorization'); // Get the Authorization header from the request

        // Check if the Authorization header is present
        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' }); // Respond with 401 if no header
        }

        // Split the header to extract the token (assumes format "Bearer <token>")
        const token = authHeader.split(' ')[1];

        // Check if the token exists
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' }); // Respond with 401 if no token
        }

        // Verify the token using the secret key
        const verified = jwt.verify(token, jwtSecretKey);

        // If verified, attach user information to the request object
        req.user = verified;
        
        next(); // Call the next middleware or route handler
        console.log('======================'); // Log to indicate completion
    } catch (error) {
        console.error('Token verification error:', error); // Log any errors that occur during verification
        return res.status(401).json({ success: false, message: 'Invalid token.' }); // Respond with 401 for invalid tokens
    }
}

export default authToken; // Export the authToken middleware for use in other parts of the application
