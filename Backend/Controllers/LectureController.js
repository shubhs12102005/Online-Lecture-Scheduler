import { Lecture } from '../Models/LectureModel.js';
import { Course } from '../Models/CourseModel.js';
import { User } from '../Models/UserModel.js';

export const createLecture = async (req, res) => {
    try {
        // Destructuring
        const courseId = req.params.id;
        console.log("Course ID: ", courseId);
        const { instructorId, lecName, batchName, date } = req.body;

        // Validations
        if (!courseId || !instructorId || !lecName || !batchName || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check id course & instructor exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const instructor = await User.findById(instructorId);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }

        // Creating lecture object and saving
        const newLecture = {
            courseId,
            instructorId,
            lecName,
            batchName,
            date
        }

        await Lecture.create(newLecture);
        return res.status(200).json({ message: "Lecture created successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllLectures = async (req, res) => {
    try {
        // Find all lectures 
        const lectures = await Lecture.find().populate('courseId', 'courseName').populate('instructorId', 'name email');

        // Validation
        if (!lectures || lectures.length === 0) {
            return res.status(404).json({ message: "No lectures found" });
        }

        return res.status(200).json({ message: "Lecture fetched successfully", lectures });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getLectureById = async (req, res) => {
    try {
        // Destructuring
        const lectureId = req.params.lectureId;

        // Validation
        if (!lectureId) {
            return res.status(400).json({ message: "Lecture ID is required" });
        }

        // Finding lecture by ID
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        return res.status(200).json({ message: "Lecture fetched successfully", lecture });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateStatusOfLecture = async (req, res) => {
    try {
        const { lectureId, status } = req.params;

        if( !lectureId || !status) {
            return res.status(400).json({ message: "Lecture ID and status are required" });
        }

        const lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        lecture.status = status;

        await lecture.save();

        return res.status(200).json({ message: "Lecture updated successfully", lecture });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;
        const { instructorId, lecName, batchName, date } = req.body;

        if( !lectureId || !instructorId || !lecName || !batchName || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const lecture = await Lecture.findById(lectureId);
        if(!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        lecture.instructorId = instructorId;
        lecture.lecName = lecName;
        lecture.batchName = batchName;
        lecture.date = date;

        await lecture.save();

        return res.status(200).json({ message: "Lecture updated successfully", lecture });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteLecture = async (req, res) => {
    try {
        const lectureId = req.params.lectureId;
        if(!lectureId) {
            return res.status(400).json({ message: "Lecture ID is required" });
        }

        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if(!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        return res.status(200).json({ message: "Lecture deleted successfully" });
    } catch (error) {

    }
}