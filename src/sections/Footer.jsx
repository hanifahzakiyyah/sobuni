const Footer = () => {
  return (
    <footer className="rounded-t-md bg-cyan-700 px-6 py-16 text-white md:py-20">

      {/* Logo */}
      <div className="flex justify-center">
        <img
          src="/logo.png"
          alt="Sbcskin"
          className="w-36 md:w-40"
        />
      </div>

      {/* Tagline */}
      <p className="mt-8 text-center font-serif text-[20px] italic text-white/90 md:text-[24px]">
        Lembut yang menenangkan.
      </p>

      {/* Navigation */}
      <nav className="mt-12 flex items-center justify-center gap-10 md:gap-12">
        <a
          href="#produk"
          className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
        >
          Produk
        </a>

        <a
          href="#tentang"
          className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
        >
          Tentang
        </a>

        <a
          href="#instagram"
          className="text-[16px] text-white/90 transition-opacity hover:opacity-60 md:text-[18px]"
        >
          Instagram
        </a>
      </nav>

      {/* Claims */}
      <div className="mt-14 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center text-[11px] tracking-[0.2em] text-white/70 md:text-[14px]">
        <span>0% FRAGRANCE</span>
        <span>·</span>
        <span>0% ALCOHOL</span>
        <span>·</span>
        <span>BPOM</span>
        <span>·</span>
        <span>HALAL</span>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-[13px] text-white/50 md:text-[16px]">
        © 2026 Sobuni
        <span className="mx-2">·</span>
        <span>sobuni.vercel.app</span>
      </div>

    </footer>
  );
};

export default Footer;