import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const AddLecture = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API;

    const navigate = useNavigate();
    const { id: courseId, lecId } = useParams();
    console.log(courseId, lecId);

    const isEditMode = (lecId) ? true : false;

    // Lecture state
    const [lecture, setLecture] = useState({
        lecName: "",
        batchName: "",
        date: "",
        instructorId: "",
    });

    // Instructor state
    const [instructor, setInstructor] = useState([]);

    // Error state
    const [error, setError] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e, name) => {
        const updatedLecture = {
            ...lecture,
            [name]: e.target.value,
        };
        setLecture(updatedLecture);
        console.log("Lecture form updated:", updatedLecture);
    };

    // Funtion to Validate all fields
    const validation = () => {
        if (!courseId) {
            setError("Course ID is missing.");
            console.log("Course ID is missing");
            return false;
        }

        if (!lecture.lecName) {
            setError("Please enter lecture name.");
            return false;
        }

        if (!lecture.instructorId) {
            setError("Please select an instructor.");
            return false;
        }

        if (!lecture.batchName) {
            setError("Please enter batch name.");
            return false;
        }

        if (!lecture.date) {
            setError("Please select lecture date.");
            return false;
        }
        return true;
    }

    // Create lecture
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;

        try {
            setLoading(true);
            setError("");
            let res;

            if (isEditMode) {
                res = await axios.put(
                    `${apiUrl}/course/${courseId}/lecture/update/${lecId}`,
                    lecture,
                    {
                        withCredentials: true,
                    }
                );
            } else {
                res = await axios.post(
                    `${apiUrl}/course/${courseId}/lecture/create`,
                    lecture,
                    {
                        withCredentials: true,
                    }
                );
            }

            if (res.status === 200) {
                navigate(`/courses/${courseId}/lectures`);
            }

        } catch (error) {
            console.log(
                "Error while creating lecture:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create lecture"
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchLectureById = async () => {
        try {
            const res = await axios.get(
                `${apiUrl}/course/${courseId}/lecture/${lecId}`,
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                const lectureData = res.data.lecture;

                // Convert backend UTC date to datetime-local format
                const date = new Date(lectureData.date);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

                console.log("Original date:", lectureData.date);
                console.log("Formatted date:", formattedDate);

                setLecture({
                    lecName: lectureData.lecName || "",
                    instructorId: lectureData.instructorId || "",
                    batchName: lectureData.batchName || "",
                    date: formattedDate,
                });
            }
        } catch (error) {
            console.log("Error fetching lecture:", error);
        }
    };

    useEffect(() => {
        if (lecId) {
            fetchLectureById();
        }
    }, [])

    // Fetch all instructors
    const fetchInstructors = async () => {
        try {
            const res = await axios.get(
                `${apiUrl}/user/instructors`,
                {
                    withCredentials: true,
                }
            );

            // If backend sends instructors
            setInstructor(res.data.instructors || []);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch instructors"
            );
        }
    };

    // Fetch instructors when page loads
    useEffect(() => {
        fetchInstructors();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8f9fc]">

            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">

                <h1 className="text-[15px] font-semibold text-gray-900">
                    Add New Lecture
                </h1>

            </div>

            {/* Main Content */}
            <div className="px-6 py-5">

                <div className="max-w-[720px] mx-auto">

                    {/* Form Card */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

                        <form
                            onSubmit={handleSubmit}
                            className="p-5 space-y-4"
                        >

                            {/* Lecture Name */}
                            <div>

                                <label
                                    htmlFor="lecName"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Lecture Name
                                </label>

                                <input
                                    id="lecName"
                                    type="text"
                                    value={lecture.lecName}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            "lecName"
                                        )
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

                            {/* Instructor */}
                            <div>

                                <label
                                    htmlFor="instructor"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Assign to Instructor
                                </label>

                                <div className="relative">

                                    <select
                                        id="instructor"
                                        value={lecture.instructorId}
                                        onChange={(e) =>
                                            handleChange(
                                                e,
                                                "instructorId"
                                            )
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
                                            Select Instructor
                                        </option>

                                        {instructor.map(
                                            (item) => (
                                                <option
                                                    key={item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </option>
                                            )
                                        )}

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

                            {/* Batch */}
                            <div>

                                <label
                                    htmlFor="batch"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Batch
                                </label>

                                <input
                                    id="batch"
                                    type="text"
                                    value={lecture.batchName}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            "batchName"
                                        )
                                    }
                                    placeholder="e.g. Third"
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

                            {/* Lecture Date */}
                            <div>

                                <label
                                    htmlFor="date"
                                    className="block text-[10px] font-medium text-gray-700 mb-1.5"
                                >
                                    Lecture Date
                                </label>

                                <input
                                    id="date"
                                    type="datetime-local"
                                    value={lecture.date}
                                    onChange={(e) =>
                                        handleChange(
                                            e,
                                            "date"
                                        )
                                    }
                                    className="
                                        w-full
                                        h-9
                                        px-3
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
                                />

                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-center text-[11px] text-red-500 font-semibold">
                                    {error}
                                </p>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-end items-center gap-2 pt-1">

                                {/* Cancel */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/courses/${courseId}/lectures`
                                        )
                                    }
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

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`
                                        h-8
                                        px-4
                                        min-w-[100px]
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

                                            "Creating..."
                                        </>
                                    ) : (
                                        isEditMode ? "Update Lecture" : "Create Lecture"
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

export default AddLecture;