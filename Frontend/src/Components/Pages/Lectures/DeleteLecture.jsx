import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import axios from "axios";

const DeleteLecture = ({ courseId, lectureId, onClose }) => {
    console.log("From delete compo ", lectureId);

    const apiUrl = import.meta.env.VITE_BACKEND_API;
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true);

            const res = await axios.delete(`${apiUrl}/course/${courseId}/lecture/delete/${lectureId}`, {
                withCredentials: true,
            });

            console.log(res);
            if (res.status === 200) {
                onClose();
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle
                        size={24}
                        className="text-red-600 dark:text-red-400"
                    />
                </div>

                {/* Content */}
                <h2 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                    Delete lecture?
                </h2>

                <p className="mb-6 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Are you sure you want to delete this lecture? This action
                    cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3">

                    {/*  Buttons  */}
                    <div className="flex justify-end items-center gap-2 pt-1">

                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={onClose}
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
                            onClick={handleDelete}
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

                                    Deleting...
                                </>
                            ) : (
                                "Delete Lecture"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DeleteLecture;