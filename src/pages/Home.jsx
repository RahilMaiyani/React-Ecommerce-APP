import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { getUserId } from "../utils/token";
import { useUsers } from "../hooks/useUsers";
import Navbar from "../components/Navbar";

export default function Home() {
  const { data, isLoading, isError } = useProducts();
  const { logout } = useAuth();
  const { mutate: addToCart } = useAddToCart();
  const { data: users } = useUsers();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const userId = getUserId();
  const currentUser = users?.find((u) => u.id == userId);

  const itemsPerPage = 12;

  // scroll smooth
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // reset page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="min-h-screen text-white bg-[#0b0b0b]">
        Error loading Products
      </div>
    );

  // FILTER
  const filteredProducts = data.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const getPageNumbers = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);

    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div
        className="min-h-screen text-white bg-[#0b0b0b] relative overflow-hidden p-5"
        style={{
            backgroundColor: "#1c1c1c",
            backgroundImage:
            'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
        }}
    >

      <Navbar search={search} setSearch={setSearch} showSearch={true} />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="bg-[#141414] rounded-xl overflow-hidden cursor-pointer group relative border border-[#2a2a2a] hover:ring-1 hover:ring-white hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="h-56 flex items-center justify-center bg-[#1c1c1c]">
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain group-hover:scale-105 hover:rotate-3 transition duration-500 ease-out"
              />
            </div>

            {/* OVERLAY */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/40 backdrop-blur-xl border border-[#2a2a2a] px-3 py-2 rounded-lg">
              <h3 className="text-sm font-medium tracking-tight text-white line-clamp-2">
                {product.title}
              </h3>

              <span className="ml-2 whitespace-nowrap bg-white text-black text-xs px-2 py-1 rounded-full font-semibold">
                ${product.price}
              </span>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({
                  userId: Number(userId),
                  date: new Date(),
                  products: [
                    {
                      productId: product.id,
                      quantity: 1,
                    },
                  ],
                });
              }}
              className="absolute top-2 right-2 bg-white text-black hover:bg-gray-200 shadow-lg text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              + Cart
            </button>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {filteredProducts.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No products found
        </p>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">

          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded disabled:opacity-40 hover:bg-[#2a2a2a]"
          >
            Prev
          </button>

          {currentPage > 3 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded"
              >
                1
              </button>
              <span className="text-gray-500">...</span>
            </>
          )}

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded border ${
                currentPage === page
                  ? "bg-white text-black border-white"
                  : "bg-[#1a1a1a] border-[#2a2a2a] hover:bg-[#2a2a2a]"
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-500">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded disabled:opacity-40 hover:bg-[#2a2a2a]"
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}