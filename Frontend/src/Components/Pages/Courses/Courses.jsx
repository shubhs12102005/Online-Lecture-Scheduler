import axios from "axios";
import React, { useEffect, useState } from "react";

const Courses = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_API;

    const [courses, setCourses] = useState([]);

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

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">

                <h1 className="text-[15px] font-semibold text-gray-900">
                    Courses
                </h1>

                <button
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
                </button>

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

                                                ${
                                                    course.courseLevel?.toLowerCase() === "advanced"
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
                                    <button
                                        className="
                                            mt-3
                                            w-full
                                            border
                                            border-gray-200
                                            bg-white
                                            hover:bg-indigo-50
                                            hover:border-indigo-200
                                            text-indigo-600
                                            text-[10px]
                                            font-medium
                                            py-2
                                            rounded-sm
                                            transition
                                            duration-200
                                        "
                                    >
                                        Manage Course
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Courses;