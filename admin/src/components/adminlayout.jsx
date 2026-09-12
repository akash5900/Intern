import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Adminlayout() {
    return <div className="h-screen flex gap-3 p-4 bg-blue-100 overflow-hidden">
        <div className=" w-90 shrink-0 bg-gray-50 shadow-sm">
            <Sidebar />
        </div>
        <div className="flex-1 min-w-0 min-h-0 bg-gray-50 shadow-sm">
            <div className="h-full overflow-y-auto px-7 py-4">
                <Outlet />
            </div>
        </div>
    </div>
}