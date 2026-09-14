import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  async function userLogin(e) {
    e.preventDefault();

    try {
      const isEmail = emailOrMobile.includes("@");

      const body = isEmail
        ? { email: emailOrMobile, password }
        : { mobilenumber: emailOrMobile, password };

      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      localStorage.setItem("Token", data.Token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center md:mt-[50px] 2xl:mt-[100px]">
      <div className="w-[400px] flex flex-col gap-[20px] p-5">
        <form
          onSubmit={userLogin}
          className="border border-blue-200 rounded-lg flex flex-col justify-center items-center gap-5 px-4 py-10 bg-gray-50 hover:shadow-xl"
        >
          <h1 className="text-xl font-semibold pb-3">Login</h1>

          <input
            type="text"
            name="emailOrMobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            required
            placeholder="Enter email or mobile number"
            className="w-full bg-white border border-gray-400 rounded-lg p-2"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              placeholder="Enter password"
              className="w-full bg-white border border-gray-400 rounded-lg p-2 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="border border-gray-500 rounded-md bg-white p-2 cursor-pointer hover:bg-blue-100 w-[200px]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
