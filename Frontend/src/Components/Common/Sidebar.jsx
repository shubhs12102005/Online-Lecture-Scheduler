import React from "react";
import {
    LayoutDashboard,
    Users,
    ClipboardCheck,
    Layers,
    BookOpen,
    CalendarDays,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role;

    const menuItems = [
        {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Dashboard",
            path: "/",
            show: true,
        },
        {
            id: "courses",
            icon: BookOpen,
            label: "Courses",
            path: "/courses",
            show: role === "Admin",
        },
        {
            id: "instructors",
            icon: Users,
            label: "Instructors",
            path: "/instructors",
            show: role === "Admin",
        },
        {
            id: "lectures",
            icon: ClipboardCheck,
            label: "Lectures",
            path: "/lectures",
            show: role === "Instructor",
        },
    ];

    return (
        <aside className="fixed left-0 top-0 w-56 h-screen bg-white border-r border-gray-200 px-4 py-5">

            {/* Logo */}
            <div className="flex items-center gap-2.5 px-2 mb-8">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                    <BookOpen size={15} className="text-white" />
                </div>

                <span className="text-[15px] font-semibold text-gray-900">
                    EduAdmin
                </span>
            </div>

            {/* Menu */}
            <div className="space-y-1">

                {menuItems
                    .filter((item) => item.show)
                    .map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-md
                                    text-[12px] transition-all duration-200
                                    ${isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={15}
                                            strokeWidth={1.8}
                                            className={
                                                isActive
                                                    ? "text-indigo-600"
                                                    : "text-gray-500"
                                            }
                                        />

                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}

            </div>

        </aside>
    );
};

export default Sidebar;