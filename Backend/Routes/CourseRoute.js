import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../Controllers/CourseController.js';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
import upload from '../Middlewares/multer.js';
const router = express.Router();

router.post('/create', isAuthenticated, upload.single("image"), createCourse);
router.get('/:id', isAuthenticated, getCourseById);
router.get('/', isAuthenticated, getAllCourses);
router.put('/update/:id', isAuthenticated, upload.single("image"), updateCourse);
router.delete('/delete/:id', isAuthenticated, deleteCourse);

export default router;