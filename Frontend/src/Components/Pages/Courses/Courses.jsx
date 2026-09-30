import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import DeleteCourse from "./DeleteCourse";

const Courses = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [isDelete, setIsDelete] = useState(false)
    const [courseId, setCourseId] = useState("");

    // Function to fetch admins courses
    const fetchCourses = async () => {
        try {
            const res = await axios.get(`${apiUrl}/course`, {
                withCredentials: true,
            });

            setCourses(res.data.courses);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect to fetch courses
    useEffect(() => {
        fetchCourses();
    }, [isDelete]);

    // Function to handle edit particular course
    const handleEditCourse = (courseId) => {
        navigate(`/courses/edit-course/${courseId}`);
    }

    // Function to handle delete particular course
    const handleDeleteCourse = (courseId) => {
        setCourseId(courseId)
        setIsDelete(true);
    }

    // Function to handle lectures of a particular course
    const handleManageCourseLectures = (courseId) => {
        navigate(`/courses/${courseId}/lectures`);
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">

                <h1 className="text-[15px] font-semibold text-gray-900">
                    Courses
                </h1>

                {/* Add Course Button */}
                <Link to='/courses/add-course'
                    className="
                        bg-indigo-600
                        hover:bg-indigo-700
                        text-white
                        text-[11px]
                        font-medium
                        px-4
                        py-2
                        rounded-md
                        transition
                        duration-200
                    "
                >
                    + Add Course
                </Link>
            </div>


            {/* Courses Container */}
            <div className="p-6">

                {courses.length === 0 ? (

                    <div className="flex items-center justify-center py-20">
                        <p className="text-sm text-gray-500">
                            No courses found
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        {courses.map((course) => (

                            <div
                                key={course._id}
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-lg
                                    overflow-hidden
                                    hover:shadow-sm
                                    transition
                                    duration-200
                                "
                            >

                                {/* Course Image */}
                                <div className="w-full h-[130px] bg-gray-100 overflow-hidden">

                                    <img
                                        src={course.courseImage}
                                        alt={course.courseName}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                </div>


                                {/* Card Content */}
                                <div className="p-3">

                                    {/* Level + Lecture */}
                                    <div className="flex items-center justify-between mb-2">

                                        <span
                                            className={`
                                                text-[9px]
                                                font-medium
                                                px-2
                                                py-1
                                                rounded-sm

                                                ${course.courseLevel?.toLowerCase() === "advanced"
                                                    ? "bg-red-50 text-red-500"
                                                    : course.courseLevel?.toLowerCase() === "beginner"
                                                        ? "bg-indigo-50 text-indigo-500"
                                                        : "bg-yellow-50 text-yellow-600"
                                                }
                                            `}
                                        >
                                            {course.courseLevel}
                                        </span>

                                        <span className="text-[9px] text-gray-500">
                                            0 lectures
                                        </span>

                                    </div>


                                    {/* Course Name */}
                                    <h2 className="text-[13px] font-semibold text-gray-900 mb-1">
                                        {course.courseName}
                                    </h2>


                                    {/* Description */}
                                    <p className="text-[10px] leading-4 text-gray-500 line-clamp-2 min-h-[32px]">
                                        {course.description}
                                    </p>


                                    {/* Button */}
                                    <div className="mt-3 w-full">
                                        <select
                                            defaultValue=""
                                            onChange={(e) => {
                                                if (e.target.value === "edit") {
                                                    handleEditCourse(course._id);
                                                }

                                                if (e.target.value === "delete") {
                                                    handleDeleteCourse(course._id);
                                                }

                                                if (e.target.value === "manage-lectures") {
                                                    handleManageCourseLectures(course._id);
                                                }

                                                // Reset back to "Manage Course"
                                                e.target.value = "";
                                            }}
                                            className="
            w-full
            appearance-none
            cursor-pointer
            rounded-sm
            border
            border-gray-200
            bg-white
            px-3
            py-2
            text-center
            text-[10px]
            font-medium
            text-indigo-600
            outline-none
            transition
            duration-200
            hover:border-indigo-200
            hover:bg-indigo-50
            focus:border-indigo-300
            focus:ring-2
            focus:ring-indigo-100
            dark:border-slate-600
            dark:bg-slate-800
            dark:text-indigo-400
        "
                                        >
                                            <option value="">Manage Course</option>
                                            <option value="edit">Edit</option>
                                            <option value="delete">Delete</option>
                                            <option value="manage-lectures">Manage Lectures</option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </div>

            {
                isDelete && <DeleteCourse courseId={courseId} onClose={() => setIsDelete(false)} />
            }

        </div>
    );
};

export default Courses;