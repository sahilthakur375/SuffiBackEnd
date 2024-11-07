// Importing required modules
import express from 'express'; // Express framework for building web applications
import http from 'http'; // HTTP module to create an HTTP server
import { Server as SocketIOServer } from 'socket.io'; // Importing Socket.IO for real-time communication
import router from './router/index.mjs'; // Importing the main router for handling routes
import fileUpload from 'express-fileupload'; // Middleware for handling file uploads
import { connect } from './db.mjs'; // Importing database connection function
import morgan from 'morgan'; // Middleware for logging HTTP requests

// Create an Express application
const app = express();
connect(); // Establish a connection to the database

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server and attach it to the HTTP server
const io = new SocketIOServer(server);

// Middleware configuration
app.use(morgan('dev')); // Log requests to the console in development format
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(fileUpload()); // Enable file upload handling

// Use the main router for handling routes
app.use('/', router);

// Handle 404 errors (Resource Not Found)
app.use((req, res) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`); // Log request details
  res.status(404).json({ // Respond with a 404 status and error message
    success: false,
    message: `Resource Not Found: ${req.method} ${req.originalUrl}`,
  });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  res.status(err.status || 500).json({ // Respond with the error status or 500
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Socket.IO configuration for handling real-time connections
io.on('connection', (socket) => {
  console.log('A user connected', socket.id); // Log when a user connects

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected'); // Log when a user disconnects
  });
});

// Export the server instance for use in other parts of the application
export default server;
