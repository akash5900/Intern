import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

export default function Auth() {
    return <div className="flex items-center justify-center mt-20 px-4">
        <div className="w-full max-w-md border border-blue-200 rounded-xl bg-white p-8 text-center shadow-sm">
            <UserRound size={50} className="mx-auto mb-4 text-gray-400" />

            <p className="text-gray-600 mb-6">
                Please login or create an account to view your profile.
            </p>

            <div className="flex justify-center gap-4">
                <Link
                    to="/login"
                    className="border border-blue-500 text-blue-600 rounded-lg px-6 py-2 hover:bg-blue-50"
                >
                    Login
                </Link>

                <Link
                    to="/signup"
                    className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600"
                >
                    Signup
                </Link>
            </div>
        </div>
    </div>
}