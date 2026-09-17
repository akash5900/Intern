import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {

        const res = await fetch("http://localhost:3000/api/user/profile", {
          credentials: "include"
        });

        const data = await res.json();

        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center mt-[80px]">
        <div className="w-[400px] border border-blue-200 rounded-lg bg-gray-50 p-10 text-center shadow-sm">
          <p className="text-gray-500 mb-7">
            Please login or create an account to view your profile.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="border border-gray-500 rounded-md bg-white px-6 py-2 cursor-pointer hover:bg-blue-100"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="border border-blue-500 rounded-md bg-blue-500 text-white px-6 py-2 cursor-pointer hover:bg-blue-600"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center mt-[80px]">
      <div className="w-[450px] border border-blue-200 rounded-lg bg-gray-50 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center mb-7">My Profile</h1>

        <div className="border-b border-gray-200 py-4">
          <p className="text-sm text-gray-500">Name</p>

          <p className="text-lg font-medium">{user.username}</p>
        </div>

        <div className="border-b border-gray-200 py-4">
          <p className="text-sm text-gray-500">Email</p>

          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <div className="border-b border-gray-200 py-4">
          <p className="text-sm text-gray-500">Mobile Number</p>

          <p className="text-lg font-medium">{user.mobilenumber}</p>
        </div>

        <div className="flex justify-center mt-7">
          <button
            onClick={handleLogout}
            className="border border-gray-500 rounded-md bg-white px-8 py-2 cursor-pointer hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
