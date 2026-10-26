import { Link, useNavigate } from "react-router-dom";
import { UserRound, Mail, Smartphone, Pencil, LogOut } from "lucide-react";
import useAuth from "../context/useAuth";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center mt-20 px-4">
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
    );
  }

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-30">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <button onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-500">Home</button>
        </div>


        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-5 p-6 sm:p-8">
            <div className="w-20 h-20 shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
              <UserRound size={54} strokeWidth={1.5} className="text-white" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                {user.username}
              </h2>

              <button
                type="button"
                onClick={() => navigate("/edit-profile")}
                className="mt-4 inline-flex items-center gap-2 border border-blue-500 text-blue-600 cursor-pointer rounded-lg px-3 py-1 text-sm font-medium hover:bg-blue-100 transition"
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-5 sm:px-8">
            <h3 className="text-base font-bold text-gray-800 mb-5">
              Account Details
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <UserRound size={18} className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-gray-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800 break-all">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Smartphone size={18} className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Mobile Number</p>
                  <p className="text-sm font-medium text-gray-800">
                    {user.mobilenumber}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full mt-7 flex items-center justify-center gap-2 border border-red-400 text-red-500 rounded-lg py-2.5 font-semibold text-sm hover:bg-red-100 transition cursor-pointer"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
