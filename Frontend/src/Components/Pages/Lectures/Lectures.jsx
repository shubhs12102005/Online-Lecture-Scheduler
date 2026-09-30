import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";

const Lectures = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const params = useParams();

    const courseId = params.id;

    const [lectures, setLectures] = useState([]);

    const fetchLectures = async () => {
        try {
            const res = await axios.get(
                `${apiUrl}/course/${courseId}/lecture`,
                {
                    withCredentials: true,
                }
            );

            console.log(res);

            setLectures(res.data.lectures || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchLectures();
    }, [courseId]);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">

                <h1 className="text-[15px] font-semibold text-gray-900">
                    Lectures
                </h1>

                <Link
                    to={`/courses/${courseId}/lectures/add-lecture`}
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
                    + Add Lectures
                </Link>

            </div>

            {/* Table Section */}
            <div className="p-6">

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            {/* Table Header */}
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Lecture Name
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Course Name
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Batch Name
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Date
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Instructor Name
                                    </th>

                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">

                                {lectures.length > 0 ? (
                                    lectures.map((lecture) => (
                                        <tr
                                            key={lecture._id}
                                            className="hover:bg-gray-50 transition duration-150"
                                        >

                                            {/* Lecture Name */}
                                            <td className="px-5 py-4 text-[12px] font-medium text-gray-900">
                                                {lecture.lecName}
                                            </td>

                                            {/* Course Name */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {lecture.courseId?.courseName || "N/A"}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        rounded-full
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-medium
                                                        ${lecture.status ===
                                                            "scheduled"
                                                            ? "bg-blue-50 text-blue-600"
                                                            : lecture.status ===
                                                                "completed"
                                                                ? "bg-green-50 text-green-600"
                                                                : "bg-red-50 text-red-600"
                                                        }
                                                    `}
                                                >
                                                    {lecture.status}
                                                </span>

                                            </td>

                                            {/* Batch Name */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {lecture.batchName}
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {new Date(
                                                    lecture.date
                                                ).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>

                                            {/* Instructor Name */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {lecture.instructorId?.name ||
                                                    "Not Assigned"}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4 text-center">
                                                <div className="relative inline-block group">

                                                    {/* Three Dots */}
                                                    <button
                                                        className="
                                                            flex
                                                            h-7
                                                            w-7
                                                            items-center
                                                            justify-center
                                                            rounded-md
                                                            text-gray-500
                                                            hover:bg-gray-100
                                                            hover:text-gray-700
                                                            transition
                                                            duration-200
                                                        "
                                                    >
                                                        <MoreVertical size={16} />
                                                    </button>

                                                    {/* Menu */}
                                                    <div
                                                        className="
                                                            invisible
                                                            absolute
                                                            right-0
                                                            top-8
                                                            z-50
                                                            w-32
                                                            rounded-md
                                                            border
                                                            border-gray-200
                                                            bg-white
                                                            py-1
                                                            opacity-0
                                                            shadow-lg
                                                            transition-all
                                                            duration-150
                                                            group-hover:visible
                                                            group-hover:opacity-100
                                                        "
                                                    >

                                                        {/* Edit */}
                                                        <button
                                                            onClick={() => handleEditLecture(lecture._id)}
                                                            className="
                                                                flex
                                                                w-full
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-2
                                                                text-left
                                                                text-[11px]
                                                                text-gray-600
                                                                hover:bg-indigo-50
                                                                hover:text-indigo-600
                                                            "
                                                        >
                                                            <Edit size={13} />
                                                            Edit
                                                        </button>

                                                        {/* View */}
                                                        <button
                                                            onClick={() => handleViewLecture(lecture._id)}
                                                            className="
                                                                flex
                                                                w-full
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-2
                                                                text-left
                                                                text-[11px]
                                                                text-gray-600
                                                                hover:bg-gray-50
                                                                hover:text-gray-800
                                                            "
                                                        >
                                                            <Eye size={13} />
                                                            View
                                                        </button>

                                                        {/* Delete */}
                                                        <button
                                                            onClick={() => handleDeleteLecture(lecture._id)}
                                                            className="
                                                                flex
                                                                w-full
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-2
                                                                text-left
                                                                text-[11px]
                                                                text-red-600
                                                                hover:bg-red-50
                                                            "
                                                        >
                                                            <Trash2 size={13} />
                                                            Delete
                                                        </button>

                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-5 py-10 text-center text-[12px] text-gray-500"
                                        >
                                            No lectures found
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Lectures;