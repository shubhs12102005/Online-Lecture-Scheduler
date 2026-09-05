import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    api_key: process.env.Api_Key,
    api_secret: process.env.Api_Secret_Key,
    cloud_name: process.env.Cloud_Name
});

// It uploads media to cloudinary
export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return uploadResponse;
    } catch (error) {
        console.log(error);
    }
}

// It deletes media from cloudinary
export const deleteMedia = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log("Media deleted successfully");
    } catch (error) {
        console.log(error);
    }
}

// It deletes video from cloudinary
export const deleteVideo = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        });
        return { message: "Media deleted successfully" };
    } catch (error) {
        console.log(error);
    }
}
