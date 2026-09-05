import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
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
}, {timestamps: true});

export const Lecture = mongoose.model('Lecture', lectureSchema); 