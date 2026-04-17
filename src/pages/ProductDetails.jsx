import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useAddToCart } from "../hooks/useAddToCart";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, isError } = useProduct(id);
  const { mutate: addToCart } = useAddToCart();

  const userId = localStorage.getItem("userId");

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white">
        Error loading Product
      </div>
    );

  return (
    <div
        className="min-h-screen text-white bg-[#0b0b0b] relative overflow-hidden p-5"
        style={{
            backgroundColor: "#1c1c1c",
            backgroundImage:
            'url("https://www.transparenttextures.com/patterns/broken-noise.png")',
        }}
    >

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px]" />
      </div>

        <Navbar showSearch={false} />

      <div className="max-w-6xl mx-auto p-6 relative z-10">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] transition"
        >
          ← Back
        </button>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* IMAGE */}
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-10 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 object-contain hover:scale-105 transition duration-500"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-6">

            {/* CATEGORY */}
            <span className="text-sm text-gray-400 uppercase tracking-wide">
              {product.category}
            </span>

            {/* TITLE */}
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              {product.title}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="text-3xl font-semibold">
              ${product.price}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-4">

              <button
                onClick={() =>
                  addToCart({
                    userId: Number(userId),
                    date: new Date(),
                    products: [
                      {
                        productId: product.id,
                        quantity: 1,
                      },
                    ],
                  })
                }
                className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="px-6 py-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-[#2a2a2a] transition"
              >
                View Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}