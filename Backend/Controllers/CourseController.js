import { Course } from '../Models/CourseModel.js';
import { uploadMedia } from '../Utils/Cloudinary.js';

// Controller for Create Course
export const createCourse = async (req, res) => {
    try {
        // Destructuring from body
        const { courseName, description, courseLevel } = req.body;
        console.log("req.body: ", req.body);
        const image = req.file;

        // If any fields are empty
        if (!courseName || !description || !courseLevel || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const courseImage = await uploadMedia(image.path);

        // Create new Course
        const newCourse = {
            courseName,
            description,
            courseLevel,
            courseImage: courseImage?.secure_url,
            creator: req.id,
        }

        await Course.create(newCourse);

        return res.status(200).json({ message: "Course created successfully" });

    } catch (error) {
        console.log("Error while creating user: ", error);
        return res.status(500).json({ message: "Failed to create course" });
    }
}

// Controller for Get All Courses
export const getAllCourses = async (req, res) => {
    try {
        const userId = req.id;
        console.log("userId: ", userId);
        const courses = await Course.find({ creator: userId }).sort({ createdAt: -1 });

        if (!courses || courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }

        return res.status(200).json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        console.log("Error while fetching courses: ", error);
        return res.status(500).json({ message: "Failed to fetch courses" });
    }
}

// Controller for Get Course By Id
export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({ message: "Course fetched successfully", course });
    } catch (error) {
        console.log("Error while fetching course: ", error);
        return res.status(500).json({ message: "Failed to fetch course" });
    }
}

// Controller for Update Course
export const updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const { courseName, description, courseLevel } = req.body;
        const image = req.file;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        let courseImageUrl;

        if (image) {
            const uploadedImage = await uploadMedia(image.path);
            courseImageUrl = uploadedImage?.secure_url;
        }

        const updatedCourse = {
            courseName: courseName || course.courseName,
            description: description || course.description,
            courseLevel: courseLevel || course.courseLevel,
            courseImage: courseImageUrl || course.courseImage
        };

        await Course.findByIdAndUpdate(courseId, updatedCourse);

        return res.status(200).json({ message: "Course updated successfully", updatedCourse });

    } catch (error) {
        console.log("Error while updating course: ", error);
        return res.status(500).json({ message: "Failed to update course" });
    }
}

// Controller for Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        const course = await Course.findByIdAndDelete(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        console.log("Error while deleting course: ", error);
        return res.status(500).json({ message: "Failed to delete course" });
    }
}