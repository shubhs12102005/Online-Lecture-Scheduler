import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Common/Sidebar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Page Content */}
            <main className="ml-56 min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;