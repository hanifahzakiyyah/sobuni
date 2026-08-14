const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-[#f1f2f3]">
      <nav className="mx-auto flex h-25.5 max-w-300 items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <img
            src="/logo.png"
            alt="Sloeskin"
            className="w-34 h-auto md:w-40"
          />
        </a>

        {/* CTA */}
        <a
          href="#belanja"
          className="flex h-14 w-36.25 items-center justify-center bg-[#1d1d1f] text-[20px] text-white transition-colors duration-300 hover:bg-black md:h-14 md:w-40.75 md:text-[23px] rounded-lg"
        >
          Belanja
        </a>
      </nav>
    </header>
  );
};

export default Navbar;