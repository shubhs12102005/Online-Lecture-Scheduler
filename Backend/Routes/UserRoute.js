import express from 'express';
import { login, logout, register, getInstructors, getInstructorById } from '../Controllers/UserController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/instructors', getInstructors);
router.get('/instructors/:UserId', getInstructorById);

export default router;