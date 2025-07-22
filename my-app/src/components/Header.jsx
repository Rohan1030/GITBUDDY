export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#140536]">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-pink-400 font-bold text-xl">CodePush</span>
      </div>
      <div>
        {/* Light/Dark toggle button placeholder */}
        <button className="text-yellow-300 background red">🌞</button>
      </div>
    </header>
  );
}
