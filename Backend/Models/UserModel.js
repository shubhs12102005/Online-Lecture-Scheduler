import mongoose from 'mongoose';

// 1. Create a Schema
const userSchema = new mongoose.Schema({
    name : {
        type:  String,
        required: true,
    },
    email : {
        type:  String,
        required: true,
    },
    password : {
        type:  String,
        required: true,
    },
    role : {
        type:  String,
        enum: ["Admin", "Instructor"],
        required: true,
    }
}, {timestamps: true});

// 2. Create a model
export const User = mongoose.model('User', userSchema);