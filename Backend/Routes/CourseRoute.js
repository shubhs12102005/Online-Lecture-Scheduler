import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } from '../Controllers/CourseController.js';
const router = express.Router();

router.post('/create', createCourse);
router.get('/:id', getCourseById);
router.get('/get', getAllCourses);
router.put('/update/:id', updateCourse);
router.delete('/delete/:id', deleteCourse);

export default router;