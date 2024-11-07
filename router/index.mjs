// Importing the Router from Express
import { Router } from 'express'; // Importing Router for route handling
import userRouter from './user.mjs'; // Importing user-specific routes

const router = Router(); // Creating a new router instance

// Using the userRouter for handling routes under the base path
router.use('/', userRouter); // Forward all requests to userRouter

// Exporting the main router for use in the application
export default router; 
