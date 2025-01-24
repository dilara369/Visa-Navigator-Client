import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { setUser, loginUser, loginUserWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    loginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        e.target.reset();
        toast.success(`Login Successful! 🎉`, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => navigate(location?.state || "/"), 500);
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setError("Invalid password. Please try again.");
        } else if (err.code === "auth/user-not-found") {
          setError("User not found. Please check your email or register.");
        } else {
          setError("Login failed. Please try again.");
        }
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await loginUserWithGoogle();
      setUser(result.user);
      navigate(location?.state ? location.state : "/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="text-center my-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full border py-2 rounded flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-md" />
            Signin with Google
          </button>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            state={{ email }}
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-4">
          <p>
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
