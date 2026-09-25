import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lecName: {
        type: String,
        required: true,
    },
    batchName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'],
        default: 'scheduled',
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true });

export const Lecture = mongoose.model('Lecture', lectureSchema); 