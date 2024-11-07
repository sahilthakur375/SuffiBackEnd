// Importing mongoose for MongoDB interaction
import mongoose from 'mongoose';

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/xyz'; 

// Function to connect to the MongoDB database
export async function connect() {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(uri);
    console.log('Successfully Connected to MongoDB'); // Log success message
    
    // Listen for connection error events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err); // Log any connection errors
    });

    // Listen for disconnection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection lost'); // Log when the connection is lost
    });

  } catch (err) {
    // Log failure message if connection fails
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with a failure code
  }
}
