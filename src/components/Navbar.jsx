import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ search, setSearch, showSearch = true }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <div className="px-6 py-4 flex items-center justify-between gap-4 mb-4 relative">

      {/* MOBILE SEARCH MODE */}
      {mobileSearch ? (
        <div className="flex items-center w-full gap-3">

          {/* BACK */}
          <button
            onClick={() => setMobileSearch(false)}
            className="p-2 rounded-lg border border-gray-700 hover:ring-1 hover:ring-white transition"
          >
            ←
          </button>

          {/* INPUT */}
          <div className="relative flex-1">
            <input
              autoFocus
              type="text"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full bg-[#111] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#3a3a3a] placeholder-gray-400"
            />

            {/* SEARCH ICON */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </span>
          </div>
        </div>
      ) : (
        <>
          {/* LEFT */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-white text-black font-bold w-6 h-6 flex items-center justify-center rounded">
              F
            </div>
            <span className="font-semibold text-white hidden sm:block">
              FAKE STORE
            </span>
          </div>

          {/* DESKTOP SEARCH*/}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-full bg-[#111] text-white border border-[#2a2a2a] focus:outline-none focus:border-[#3a3a3a] placeholder-gray-400 hover:ring-1 hover:ring-white transition"
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </span>
              </div>
            </div>
          )}

          {/* RIGHT (UNCHANGED STYLE) */}
          <div className="flex items-center gap-4">

            {/* MOBILE SEARCH BUTTON */}
            {showSearch && (
              <button
                onClick={() => setMobileSearch(true)}
                className="md:hidden p-2 rounded-lg border border-gray-700 hover:ring-1 hover:ring-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            )}

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-lg border border-gray-700 hover:ring-1 hover:ring-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
              </svg>
            </button>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="p-2 rounded-lg border border-gray-700 hover:ring-1 hover:ring-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}