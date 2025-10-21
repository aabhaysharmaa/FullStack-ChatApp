import express from 'express';
const router = express.Router();

import { signInUser, loginUser, logoutUser, updateProfile, checkUser } from '../controllers/auth.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

// router.use(arcjetProtection);
router.post('/signin', signInUser);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, logoutUser);
router.put('/updateProfile', isAuthenticated, updateProfile);
router.get("/check", isAuthenticated, checkUser)
export default router;

