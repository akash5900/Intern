import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Adminlayout() {
    return (
        <div className="h-screen flex flex-col md:flex-row gap-3 p-2 sm:p-4 bg-blue-100 overflow-hidden">
            <div className="w-full md:w-70 2xl:w-90 shrink-0 bg-gray-50 shadow-sm rounded-md">
                <Sidebar />
            </div>

            <div className="flex-1 min-w-0 min-h-0 bg-gray-50 shadow-sm rounded-md overflow-hidden">
                <div className="h-full overflow-y-auto px-3 sm:px-5 md:px-7 py-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
