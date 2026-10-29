import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

export default function Auth() {
    return (
        <div className="mt-50 md:mt-20 flex items-center justify-center px-3 sm:px-4">
            <div className="w-full max-w-md rounded-xl border border-blue-200 bg-white p-5 sm:p-6 md:p-8 text-center shadow-sm">
                <UserRound
                    size={50}
                    className="mx-auto mb-4 text-gray-400"
                />

                <p className="mb-6 text-sm sm:text-base text-gray-600">
                    Please login or create an account to view your profile.
                </p>

                <div className="flex justify-center gap-3 sm:gap-4">
                    <Link
                        to="/login"
                        className="rounded-lg border border-blue-500 px-5 sm:px-6 py-2 text-blue-600 hover:bg-blue-50"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="rounded-lg bg-blue-500 px-5 sm:px-6 py-2 text-white hover:bg-blue-600"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}