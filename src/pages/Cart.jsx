import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

export default function Cart() {
  const userId = localStorage.getItem("userId");

  const { data: cartData, isLoading } = useCart(userId);
  const { data: products } = useProducts();

  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  const cart = cartData?.[0];

  if (!cart) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center">
        <p className="text-gray-500">Cart is empty</p>
      </div>
    );
  }

  const total = cart.products.reduce((acc, item) => {
    const product = products?.find((p) => p.id === item.productId);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

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

      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight">
          Your Cart
        </h1>

        {/* ITEMS */}
        <div className="space-y-4">
          {cart.products.map((item, i) => {
            const product = products?.find(
              (p) => p.id === item.productId
            );

            if (!product) return null;

            return (
              <div
                key={i}
                className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 flex gap-4 items-center hover:border-[#3a3a3a] transition"
              >
                <div className="bg-[#1c1c1c] p-2 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-16 w-16 object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-sm font-medium tracking-tight">
                    {product.title}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div className="text-sm font-semibold">
                  ${product.price}
                </div>
              </div>
            );
          })}
        </div>

        {/* TOTAL */}
        <div className="mt-8 bg-[#141414] border border-[#2a2a2a] rounded-xl p-5 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            Total
          </h2>

          <span className="text-xl font-semibold">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#2a2a2a] transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition font-medium"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}