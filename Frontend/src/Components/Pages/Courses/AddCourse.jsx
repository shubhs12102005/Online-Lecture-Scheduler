import axios from "axios";
import React, { useEffect, useState } from "react";
import { UploadCloud, ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AddCourse = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const navigate = useNavigate();
    const params = useParams();

    // State to manage course data
    const [course, setCourse] = useState({
        courseName: "",
        courseLevel: "",
        description: "",
        image: null,
    });

    // courseId will come when editing a course
    const courseId = params.id;

    // While editing, we need to keep track of whether we are in edit mode or not
    const isEditMode = courseId ? true : false;

    // Error state
    const [error, setError] = useState("");

    // loading state
    const [loading, setLoading] = useState(false);

    // Validate Function
    const validate = () => {
        if (!course.courseName || !course.courseLevel || !course.description || !course.image) {
            setError("Please fill all the fields!");
            return false;
        }
        return true;
    };

    // Function to handle change
    const handleChange = (e, name) => {
        setCourse({
            ...course,
            [name]: e.target.value,
        });
    };

    // Function to handle image change
    const handleImageChange = (e) => {
        setCourse({
            ...course,
            image: e.target.files[0],
        });
    };

    // Function to handle submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            if (!validate()) return;
            setLoading(true);

            // Creating formData to send data to backend
            const formData = new FormData();
            formData.append("courseName", course.courseName);
            formData.append("courseLevel", course.courseLevel);
            formData.append("description", course.description);
            formData.append("image", course.image);

            let res;

            // If we are in edit mode
            if (isEditMode) {
                res = await axios.put(`${apiUrl}/course/update/${courseId}`, formData, {
                    withCredentials: true,
                })
            }
            // If we are in add mode
            else {
                res = await axios.post(`${apiUrl}/course/create`, formData, {
                    withCredentials: true,
                });
            }

            if (res.status === 200) {
                navigate('/courses');
            }

        } catch (error) {
            console.log("Error while adding course: ", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch course details if we are in edit mode
    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (courseId) {
                const res = await axios.get(`${apiUrl}/course/${courseId}`, {
                    withCredentials: true,
                })

                if (res.status === 200) {
                    console.log(res.data.course);
                    setCourse({
                        courseName: res.data.course.courseName,
                        courseLevel: res.data.course.courseLevel,
                        description: res.data.course.description,
                        image: null, // Image is not fetched; user needs to re-upload if they want to change it
                    });
                }

            }
        }

        fetchCourseDetails();
    }, [courseId])

    return (
        <div className="min-h-screen bg-[#f8f9fc]">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">

                {/* Page Title */}
                <h1 className="text-[15px] font-semibold text-gray-900">
                    Add New Course
                </h1>

            </div>


            {/* Main Content */}
            <div className="px-6 py-5">

                <div className="max-w-[720px] mx-auto">

                    {/*  Form  */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <form
                            onSubmit={handleSubmit}
                            className="p-5 space-y-4"
                        >

                            {/* Course name  */}
                            <div>

                                <label
                                    htmlFor="name"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Course Name
                                </label>

                                <input
                                    id="courseName"
                                    type="text"
                                    value={course.courseName}
                                    onChange={(e) =>
                                        handleChange(e, "courseName")
                                    }
                                    placeholder="e.g. Introduction to React"
                                    className="
                                        w-full
                                        h-9
                                        px-3
                                        text-[10px]
                                        text-gray-700
                                        placeholder:text-gray-400
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-md
                                        outline-none
                                        focus:border-[#5140d8]
                                        focus:ring-2
                                        focus:ring-[#5140d8]/10
                                        transition
                                    "
                                />

                            </div>

                            {/* Level */}
                            <div>

                                <label
                                    htmlFor="courseLevel"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Difficulty Level
                                </label>

                                <div className="relative">

                                    <select
                                        id="courseLevel"
                                        value={course.courseLevel}
                                        onChange={(e) =>
                                            handleChange(e, "courseLevel")
                                        }
                                        className="
                                            appearance-none
                                            w-full
                                            h-9
                                            px-3
                                            pr-8
                                            text-[10px]
                                            text-gray-700
                                            bg-white
                                            border
                                            border-gray-200
                                            rounded-md
                                            outline-none
                                            focus:border-[#5140d8]
                                            focus:ring-2
                                            focus:ring-[#5140d8]/10
                                            transition
                                        "
                                    >

                                        <option value="">
                                            Select level...
                                        </option>

                                        <option value="Beginner">
                                            Beginner
                                        </option>

                                        <option value="Intermediate">
                                            Intermediate
                                        </option>

                                        <option value="Advanced">
                                            Advanced
                                        </option>

                                    </select>

                                    <ChevronDown
                                        size={14}
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-500
                                            pointer-events-none
                                        "
                                    />

                                </div>

                            </div>

                            {/* Description */}
                            <div>

                                <label
                                    htmlFor="description"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    value={course.description}
                                    onChange={(e) =>
                                        handleChange(e, "description")
                                    }
                                    placeholder="Write a short brief about the course objectives, curriculum, and targeted audience."
                                    className="
                                        w-full
                                        h-[70px]
                                        px-3
                                        py-2.5
                                        text-[10px]
                                        leading-4
                                        text-gray-700
                                        placeholder:text-gray-400
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-md
                                        outline-none
                                        resize-none
                                        focus:border-[#5140d8]
                                        focus:ring-2
                                        focus:ring-[#5140d8]/10
                                        transition
                                    "
                                />

                            </div>

                            {/*  Image  */}
                            <div>

                                <label
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Course Cover Image
                                </label>

                                <label
                                    htmlFor="courseImage"
                                    className="
                                        w-full
                                        h-[72px]
                                        border
                                        border-dashed
                                        border-gray-300
                                        rounded-md
                                        bg-[#fafbfc]
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        cursor-pointer
                                        hover:border-[#5140d8]
                                        hover:bg-[#f8f7ff]
                                        transition
                                    "
                                >

                                    <UploadCloud
                                        size={18}
                                        strokeWidth={1.7}
                                        className="text-[#5140d8] mb-1"
                                    />

                                    <span className="text-[9px] font-medium text-gray-700">
                                        Click to upload or drag and drop
                                    </span>

                                    <span className="text-[7px] text-gray-400 mt-0.5">
                                        SVG, PNG, JPG or GIF (max. 800×400px)
                                    </span>

                                    <input
                                        id="courseImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>

                                {/* Selected image name */}
                                {course.image && (
                                    <p className="text-[8px] text-gray-500 mt-1">
                                        Selected: {course.image.name}
                                    </p>
                                )}

                            </div>

                            {/* Error */}
                            {
                                error && <p className="text-center text-md text-red-500 font-bold">{error}</p>
                            }

                            {/*  Buttons  */}
                            <div className="flex justify-end items-center gap-2 pt-1">

                                {/* Cancel Button */}
                                <button
                                    type="button"
                                    onClick={() => navigate('/courses')}
                                    className="
                                        h-8
                                        px-4
                                        bg-white
                                        border
                                        border-gray-200
                                        text-gray-700
                                        text-[9px]
                                        font-medium
                                        rounded-md
                                        hover:bg-gray-50
                                        transition
                                    "
                                >
                                    Cancel
                                </button>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`
                                                h-8
                                                px-4
                                                min-w-[85px]
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                bg-[#5140d8]
                                                text-white
                                                text-[9px]
                                                font-medium
                                                rounded-md
                                                transition
                                                ${loading
                                            ? "opacity-70 cursor-not-allowed"
                                            : "hover:bg-[#4434c5]"
                                        }
                                        `}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="
                                                    w-3
                                                    h-3
                                                    border-2
                                                    border-white/40
                                                    border-t-white
                                                    rounded-full
                                                    animate-spin
                                                "
                                            />

                                            Creating...
                                        </>
                                    ) : (
                                        isEditMode ? "Update Course" : "Create Course"
                                    )}
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddCourse;