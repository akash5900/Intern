import { Navigate } from "react-router-dom";
export default function AdminProtectedRoute({ children }) {

    const isAdmin = localStorage.getItem("AdminToken");

    if (!isAdmin) {
        return <Navigate to="/admin/login" />
    }

    return children;
}
