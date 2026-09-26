import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    // backend api
    const apiUrl = import.meta.env.VITE_BACKEND_API;

    // User state
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Error state
    const [error, setError] = useState("")

    // Function to handle input change
    const handleChange = (e, input) => {
        setUser({
            ...user,
            [input]: e.target.value,
        });
    };

    // Function to validate inputs
    const validate = () => {
        if (user.name === "" || user.name.length < 2) {
            setError("Correct name is required!")
            return false;
        }
        if (user.email === "") {
            setError("email is required!")
            return false;
        }
        if (user.password === "" || user.password.length < 8) {
            setError("Password is must greater or equal to 8 characters!")
            return false;
        }
        return true;
    }

    // Function to handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await axios.post(
                `${apiUrl}/user/register`,
                {
                    ...user,
                    role: "Instructor"
                }
            );

            if (res.status === 200) {
                console.log("User ID:", res.data.user._id);
                console.log("User:", res.data.user);
            }

        } catch (error) {
            console.log("Registration error:", error);
            console.log("Backend error:", error.response?.data);
            setError("Error while creating user!");
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* ================= LEFT SECTION ================= */}
            <div className="hidden md:flex w-1/2 min-h-screen bg-gradient-to-br from-[#29266f] via-[#4b2acb] to-[#7020d8] text-white px-10 lg:px-12 py-8 flex-col">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#5140d8] rounded-sm"></div>
                    </div>

                    <span className="text-sm font-semibold">
                        EduAdmin
                    </span>
                </div>


                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center max-w-[500px]">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                            Empower your education
                            <br />
                            training team
                        </h1>

                        <p className="text-sm text-white/70 mt-4 max-w-[430px] leading-relaxed">
                            Simplify schedule management, course planning,
                            and instructor coordination in one platform.
                        </p>
                    </div>


                    {/* Course Performance Card */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5">

                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-xs font-medium">
                                Course Performance
                            </span>

                            <span className="text-[10px] text-white/60">
                                Live View
                            </span>
                        </div>


                        {/* Statistics */}
                        <div className="grid grid-cols-3 gap-3">

                            {/* Active Courses */}
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-[9px] text-white/60">
                                    Active Courses
                                </p>

                                <h2 className="text-xl font-semibold mt-1">
                                    24
                                </h2>

                                <p className="text-[9px] text-white/60 mt-1">
                                    +12%
                                </p>
                            </div>


                            {/* Students */}
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-[9px] text-white/60">
                                    Total Students
                                </p>

                                <h2 className="text-xl font-semibold mt-1">
                                    1,240
                                </h2>

                                <p className="text-[9px] text-white/60 mt-1">
                                    +28%
                                </p>
                            </div>


                            {/* Attendance */}
                            <div className="bg-white/10 rounded-lg p-3">
                                <p className="text-[9px] text-white/60">
                                    Avg. Attendance
                                </p>

                                <h2 className="text-xl font-semibold mt-1">
                                    92%
                                </h2>

                                <p className="text-[9px] text-white/60 mt-1">
                                    +4%
                                </p>
                            </div>

                        </div>


                        {/* Server Capacity */}
                        <div className="mt-6">

                            <div className="flex justify-between text-[9px] text-white/60 mb-2">
                                <span>Server Capacity Usage</span>
                                <span>78%</span>
                            </div>

                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-[78%] h-full bg-white rounded-full"></div>
                            </div>

                        </div>

                    </div>

                </div>


                {/* Footer */}
                <div className="text-[9px] text-white/40">
                    © 2026 EduAdmin. All rights reserved.
                </div>

            </div>


            {/* ================= RIGHT SECTION ================= */}
            <div className="w-full md:w-1/2 min-h-screen bg-white flex items-center justify-center px-6">

                <div className="w-full max-w-[360px]">

                    {/* Header */}
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Create Account
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            Set up your admin account
                        </p>
                    </div>


                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-[11px] font-medium text-gray-700 mb-1"
                            >
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={user.name}
                                onChange={(e) => handleChange(e, "name")}
                                placeholder="e.g. Shubham Jakkula"
                                className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md outline-none focus:border-[#5140d8] focus:ring-1 focus:ring-[#5140d8]/20 transition"
                            />
                        </div>


                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[11px] font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                onChange={(e) => handleChange(e, "email")}
                                placeholder="e.g. shubham@edu.com"
                                className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md outline-none focus:border-[#5140d8] focus:ring-1 focus:ring-[#5140d8]/20 transition"
                            />
                        </div>


                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[11px] font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => handleChange(e, "password")}
                                placeholder="Minimum 8 characters"
                                className="w-full h-9 px-3 text-xs border border-gray-200 rounded-md outline-none focus:border-[#5140d8] focus:ring-1 focus:ring-[#5140d8]/20 transition"
                            />
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full h-9 bg-[#5140d8] hover:bg-[#4434c5] text-white text-xs font-medium rounded-md transition duration-200"
                        >
                            Create Account
                        </button>

                        {
                            error && <p className="text-center text-md text-red-500 font-bold">{error}</p>
                        }

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Register;