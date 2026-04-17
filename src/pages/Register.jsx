import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export default function Register() {
  const navigate = useNavigate();
  const { data: users } = useUsers();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const { mutate, isPending } = useRegister();

  const validate = () => {
    let newErrors = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (users?.some((u) => u.email === form.email)) {
      newErrors.email = "Email already registered";
    }

    if (form.username.length < 3) {
      newErrors.username = "Min 3 characters required";
    }

    if (form.password.length < 6) {
      newErrors.password = "Min 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    mutate(form, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1500);
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
      {/* glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[120px]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#141414] border border-[#2a2a2a] rounded-xl p-8 w-80 space-y-4"
      >
        <h2 className="text-white text-xl text-center font-semibold">
          Create Account
        </h2>

        {/* SUCCESS */}
        {success && (
          <div className="text-green-400 text-sm text-center">
            Account created successfully 🎉
          </div>
        )}

        {/* EMAIL */}
        <div>
          <input
            placeholder="Email"
            disabled={success}
            className={`w-full px-4 py-2 rounded-lg bg-[#1c1c1c] border text-white placeholder-gray-500 focus:outline-none transition ${
              errors.email
                ? "border-red-500"
                : "border-[#2a2a2a] focus:border-[#3a3a3a]"
            }`}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* USERNAME */}
        <div>
          <input
            placeholder="Username"
            disabled={success}
            className={`w-full px-4 py-2 rounded-lg bg-[#1c1c1c] border text-white placeholder-gray-500 focus:outline-none transition ${
              errors.username
                ? "border-red-500"
                : "border-[#2a2a2a] focus:border-[#3a3a3a]"
            }`}
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">
              {errors.username}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Password"
            disabled={success}
            className={`w-full px-4 py-2 rounded-lg bg-[#1c1c1c] border text-white placeholder-gray-500 focus:outline-none transition ${
              errors.password
                ? "border-red-500"
                : "border-[#2a2a2a] focus:border-[#3a3a3a]"
            }`}
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          disabled={success || isPending}
          className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition disabled:opacity-50"
        >
          {isPending
            ? "Creating..."
            : success
            ? "Success ✓"
            : "Register"}
        </button>

        {/* LINK */}
        <div className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-white underline cursor-pointer hover:text-gray-300"
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}