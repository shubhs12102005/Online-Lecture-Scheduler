import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";

const Instructors = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const navigate = useNavigate();

    const [instructors, setInstructors] = useState([]);

    // Function to fetch instructors
    const fetchInstructors = async () => {
        try {

            const res = await axios.get(
                `${apiUrl}/user/instructors`,
                {
                    withCredentials: true,
                }
            );

            console.log(res);

            setInstructors(res.data.instructors || []);

        } catch (error) {
            console.log("Error while fetching instructors:", error);
        }
    };

    // Fetch instructors when page loads
    useEffect(() => {
        fetchInstructors();
    }, []);

    // Function to handle edit instructor
    const handleEditInstructor = (instructorId) => {
        navigate(`/instructors/edit-instructor/${instructorId}`);
    };

    // Function to handle delete instructor
    const handleDeleteInstructor = (instructorId) => {
        console.log("Delete Instructor:", instructorId);

        // Delete API will be added here
    };

    // Function to handle view instructor
    const handleViewInstructor = (instructorId) => {
        navigate(`/instructors/${instructorId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">

                <h1 className="text-[15px] font-semibold text-gray-900">
                    Instructors
                </h1>

                {/* Add Instructor Button */}
                <Link
                    to="/instructors/add-instructor"
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
                    + Add Instructor
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

                                    {/* Name */}
                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Instructor Name
                                    </th>

                                    {/* Email */}
                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Email
                                    </th>

                                    {/* Role */}
                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Role
                                    </th>

                                    {/* Status */}
                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                                        Status
                                    </th>

                                    {/* Actions */}
                                    <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wide text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100">

                                {instructors.length > 0 ? (

                                    instructors.map((instructor) => (

                                        <tr
                                            key={instructor._id}
                                            className="hover:bg-gray-50 transition duration-150"
                                        >

                                            {/* Instructor Name */}
                                            <td className="px-5 py-4 text-[12px] font-medium text-gray-900">
                                                {instructor.name}
                                            </td>


                                            {/* Email */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {instructor.email}
                                            </td>


                                            {/* Role */}
                                            <td className="px-5 py-4 text-[12px] text-gray-600">
                                                {instructor.role}
                                            </td>


                                            {/* Status */}
                                            <td className="px-5 py-4">

                                                <span
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        rounded-full
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-medium
                                                        bg-green-50
                                                        text-green-600
                                                    "
                                                >
                                                    Active
                                                </span>

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
                                                            onClick={() =>
                                                                handleEditInstructor(
                                                                    instructor._id
                                                                )
                                                            }
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
                                                            onClick={() =>
                                                                handleViewInstructor(
                                                                    instructor._id
                                                                )
                                                            }
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
                                                            <Eye size={13} />
                                                            View
                                                        </button>


                                                        {/* Delete */}
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteInstructor(
                                                                    instructor._id
                                                                )
                                                            }
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
                                            colSpan="5"
                                            className="
                                                px-5
                                                py-10
                                                text-center
                                                text-[12px]
                                                text-gray-500
                                            "
                                        >
                                            No instructors found
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

export default Instructors;