import express from 'express';
import { login, logout, register, getInstructors, getInstructorById } from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/instructors', isAuthenticated, getInstructors);
router.get('/instructors/:UserId', isAuthenticated, getInstructorById);

export default router;