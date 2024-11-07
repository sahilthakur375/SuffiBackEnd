// Importing mongoose for MongoDB interaction
import mongoose from 'mongoose';

// Defining the user schema using Mongoose
const userSchema = new mongoose.Schema({
    name: {
        type: String, // Name field of type String
        required: true // This field is required
    },
    email: { 
        type: String, // Email field of type String
        required: true, // This field is required
        unique: true // This field must be unique across documents
    },
    password: {
        type: String, // Password field of type String
        required: true // This field is required
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

// Creating a User model based on the user schema
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other parts of the application
export default User;
