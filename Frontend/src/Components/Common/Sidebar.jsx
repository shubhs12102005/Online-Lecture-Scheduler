import React, { useEffect } from 'react'
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    PanelRightOpen,
    PanelRightClose,
    Layers,
    ShieldAlert,
    ClipboardCheck,
    Database,
    ListChecks,
    CloudUpload,
} from "lucide-react";

const Sidebar = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;

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
            icon: Users,
            label: "Courses",
            path: "/courses",
            show: role === "Admin",
        },
        {
            id: "instructors",
            icon: Layers,
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
        <div>
            <div>
                {
                    menuItems
                        .filter((item) => item.show)
                        .map((item, idx) => {
                            return (
                                <div key={idx}>
                                    {item.label}
                                </div>
                            );
                        })
                }
            </div>
        </div>
    )
}

export default Sidebar