import { useProducts } from "../hooks/useProducts";
import { useAuth } from "../context/AuthContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Loader from "../components/Loader";
import { getUserId } from "../utils/token";
import { useUsers } from "../hooks/useUsers";
import Navbar from "../components/Navbar";

import Drawer from "@mui/material/Drawer";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";

export default function Home() {
  const { data, isLoading, isError } = useProducts();
  const { logout } = useAuth();
  const { mutate: addToCart } = useAddToCart();
  const { data: users } = useUsers();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const navigate = useNavigate();
  const userId = getUserId();
  const currentUser = users?.find((u) => u.id == userId);

  const itemsPerPage = 12;

  const products = Array.isArray(data) ? data : [];

  const { minPrice, maxPrice, categories } = useMemo(() => {
    if (!products.length) {
      return {
        minPrice: 0,
        maxPrice: 0,
        categories: [],
      };
    }

    const prices = products.map((p) => p.price);
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    const cats = [...new Set(products.map((p) => p.category))];

    return {
      minPrice: min,
      maxPrice: max,
      categories: cats,
    };
  }, [products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, priceRange, selectedCategories]);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products.length, minPrice, maxPrice]);

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="min-h-screen text-white bg-[#0b0b0b]">
        Error loading Products
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      p.price >= priceRange[0] && p.price <= priceRange[1];

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);

    return matchSearch && matchPrice && matchCategory;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
      }}
    >
      <Navbar search={search} setSearch={setSearch} showSearch={true} />

      <div className="flex justify-end mb-4 relative z-10">
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-[#141414] border border-[#2a2a2a] px-4 py-2 rounded-full hover:ring-1 hover:ring-white transition"
        >
          Filters
        </button>
      </div>

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
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/40 backdrop-blur-lg border border-[#2a2a2a] px-3 py-2 rounded-lg">
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
            className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded disabled:opacity-40 hover:bg-[#2a2a2a] transition"
          >
            Prev
          </button>

          {currentPage > 3 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded hover:bg-[#2a2a2a] transition"
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
              className={`px-3 py-1 rounded border transition ${
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
                className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded hover:bg-[#2a2a2a] transition"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded disabled:opacity-40 hover:bg-[#2a2a2a] transition"
          >
            Next
          </button>
        </div>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            top: "90px",
            height: "calc(100% - 90px)",
            width: "320px",
            backgroundColor: "#1c1c1c",
            color: "#ffffff",
            borderLeft: "1px solid #2a2a2a",
            padding: "20px",
            borderTopLeftRadius : "20px",
            overflow : "hidden"
          }
        }}
      >
        <div className="flex flex-col h-full justify-between">
          {/* TOP CONTENT */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold tracking-tight">
                Filters
              </h2>

              <button
                onClick={() => setDrawerOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* PRICE SECTION */}
            <div className="mb-8 ">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Price Range
              </p>

              <div className="px-1">
                <Slider
                  value={priceRange}
                  onChange={(e, val) => setPriceRange(val)}
                  valueLabelDisplay="auto"
                  min={minPrice}
                  max={maxPrice}
                  sx={{
                    color: "#fff",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#fff",
                      width: 14,
                      height: 14,
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#fff",
                      height: 3,
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#333",
                      height: 3,
                    },
                  }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            {/* CATEGORY SECTION */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Categories
              </p>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 text-sm text-gray-300 hover:text-white cursor-pointer transition"
                  >
                    <Checkbox
                      checked={selectedCategories.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories((prev) => [...prev, cat]);
                        } else {
                          setSelectedCategories((prev) =>
                            prev.filter((c) => c !== cat)
                          );
                        }
                      }}
                      sx={{
                        padding: "4px",
                        color: "#666",
                        "&.Mui-checked": {
                          color: "#fff",
                        },
                      }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ACTION */}
          <div className="pt-6 border-t border-[#2a2a2a]">
            <button
              onClick={() => {
                setPriceRange([minPrice, maxPrice]);
                setSelectedCategories([]);
              }}
              className="w-full py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}