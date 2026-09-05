import Course from '../Models/CourseModel.js';
import { uploadMedia } from '../Utils/Cloudinary.js';

export const createCourse = async (req, res) => {
    try {
        // Destructuring from body
        const { courseName, description, courseLevel } = req.body;
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

    } catch (error) {
        console.log("Error while creating user: ", error);
        return res.status(500).json({ message: "Failed to create User" });
    }
}