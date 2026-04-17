import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { setUserId } from "../utils/token";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { mutate, isPending } = useLogin();
  const { data: users } = useUsers();
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!form.username || !form.password) {
      setError("All fields are required");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    mutate(form, {
      onSuccess: (data) => {
        const currentUser = users?.find(
          (u) =>
            u.username === form.username &&
            u.password === form.password
        );

        if (!currentUser) {
          setError("Invalid username or password");
          return;
        }

        login(data.token);
        setUserId(currentUser.id);
        navigate("/");
      },
      onError: () => {
        setError("Login failed. Try again.");
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden p-5"
      style={{
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
      }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[120px]" />
      </div>

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#141414] border border-[#2a2a2a] rounded-xl p-8 w-80 space-y-5 shadow-[0_0_30px_rgba(255,255,255,0.05)]"
      >
        <h2 className="text-white text-xl font-semibold tracking-tight text-center">
          Welcome Back
        </h2>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-3 py-2 rounded text-center">
            {error}
          </div>
        )}

        {/* USERNAME */}
        <input
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:border-[#3a3a3a] transition"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-[#1c1c1c] border border-[#2a2a2a] text-white placeholder-gray-500 focus:outline-none focus:border-[#3a3a3a] transition"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {/* LINK */}
        <div className="text-gray-400 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-white underline cursor-pointer hover:text-gray-300"
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
}