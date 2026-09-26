import express from 'express';
import { isAuthenticated } from '../Middlewares/isAuthenticated.js';
import { createLecture, deleteLecture, getAllCourseLectures, getAllInstructorLectures, getLectureById, updateLecture, updateStatusOfLecture } from '../Controllers/LectureController.js';
const router = express.Router({ mergeParams: true });

router.post('/create', isAuthenticated, createLecture);
router.get('/instructor', isAuthenticated, getAllInstructorLectures);
router.get('/', isAuthenticated, getAllCourseLectures);
router.get('/:id', isAuthenticated, getLectureById);
router.put('/update/:id', isAuthenticated, updateLecture);
router.put('/update-status/:id', isAuthenticated, updateStatusOfLecture);
router.delete('/delete/:id', isAuthenticated, deleteLecture);

export default router;