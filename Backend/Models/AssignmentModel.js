import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
    lectureId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecture',
        required: true,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

export const Assignment = mongoose.model('Assignment', assignmentSchema); 