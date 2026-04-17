export default function Loader() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#0b0b0b] relative overflow-hidden"
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

      {/* spinner */}
      <div className="relative z-10 w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}