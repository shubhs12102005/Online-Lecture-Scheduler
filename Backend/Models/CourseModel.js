import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    courseImage: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema); 