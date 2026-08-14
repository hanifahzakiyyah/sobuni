const Hero = () => {
  return (
    <section className="bg-[#f1f2f3]">

      {/* ================= HERO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-5 -mb-10">

        {/* Left - Content */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-[10%] md:py-20">

          <span className="mb-2 md:mb-8 text-[10px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
            GENTLE SKINCARE
          </span>

          <h1 className="max-w-162.5 font-serif text-[42px] leading-[0.95] tracking-[-2px] text-[#1d1d1f] md:text-[64px] lg:text-[68px]">
            Lembut yang
            <br />
            menenangkan.
          </h1>

          <p className="mt-5 md:mt-10 max-w-150 text-[16px] leading-[1.55] text-[#1d1d1f] md:text-[18px]">
            Facial wash yang lembut dan merawat skin barrier —
            cukup aman dipakai sekeluarga, dari anak hingga kulit
            paling sensitif.
          </p>

          <a
            href="#belanja"
            className="mt-14 flex h-14 w-36 items-center justify-center rounded-lg bg-[#1d1d1f] text-[18px] text-white transition-colors duration-300 hover:bg-black md:h-16 md:w-40 md:text-[21px]"
          >
            Belanja
          </a>

        </div>

        {/* Right - Image */}
        <div className="h-[70vh] min-h-125 md:h-auto p-5 md:p-15">
          <img
            src="/hero.png"
            alt="Sloeskin Gentle Facial Wash"
            className="h-full w-full object-cover"
          />
        </div>

      </div>


      {/* ================= FEATURE PILLS ================= */}
      <div className="px-6 py-8 md:px-10 md:py-10 ">

        <div className="mx-auto flex md:max-w-225 flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-5 ">

          {/* Barrier-first */}
          <div className="flex h-9 md:h-12 items-center justify-center gap-4 rounded-full border border-[#1d1d1f] px-7 text-[14px] text-[#1d1d1f] md:px-8 w-fit shrink-0 m-auto">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 3 20 7v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
            </svg>

            <span>Barrier-first</span>
          </div>

          {/* Lembut dipakai tiap hari */}
          <div className="flex h-9 md:h-12 items-center justify-center gap-4 rounded-full border border-[#1d1d1f] px-7 text-[14px] text-[#1d1d1f] md:px-8 w-fit shrink-0 m-auto">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20 4C11 4 5 8 4 17c5-1 10-4 13-9" />
              <path d="M4 17c2-2 4-4 7-5" />
            </svg>

            <span>Lembut dipakai tiap hari</span>
          </div>

          {/* Bisa dipakai sekeluarga */}
          <div className="flex h-9 md:h-12 items-center justify-center gap-4 rounded-full border border-[#1d1d1f] px-7 text-[14px] text-[#1d1d1f] md:px-8 w-fit shrink-0 m-auto">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="8" r="2.5" />
              <circle cx="17" cy="9" r="2" />
              <path d="M4 19c0-3 2-5 5-5s5 2 5 5" />
              <path d="M15 14c3 0 5 2 5 5" />
            </svg>

            <span>Bisa dipakai sekeluarga</span>
          </div>

          {/* Bumil & busui friendly */}
          <div className="flex h-9 md:h-12 items-center justify-center gap-4 rounded-full border border-[#1d1d1f] px-7 text-[14px] text-[#1d1d1f] md:px-8 w-fit shrink-0 m-auto">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.8 8.8c0 5.5-8.8 10.2-8.8 10.2S3.2 14.3 3.2 8.8A4.8 4.8 0 0 1 12 6a4.8 4.8 0 0 1 8.8 2.8Z" />
            </svg>

            <span>Bumil & busui friendly</span>
          </div>

        </div>
      </div>


      {/* ================= INFO BAR ================= */}
      <div className="m-auto border-y border-black/20 max-w-[80%] md:max-w-[75%]">

        <div className="mx-auto flex max-w-300 flex-col items-center justify-center py-3 md:flex-row md:py-4 md:gap-9">

          <span className="text-[12px] tracking-widest text-[#1d1d1f] md:text-[14px]">
            0% FRAGRANCE
          </span>

          <span className="text-[12px] tracking-widest text-[#1d1d1f] md:text-[14px]">
            0% ALCOHOL
          </span>

          <span className="text-[12px] tracking-widest text-[#1d1d1f] md:text-[14px]">
            LOW-IRRITANT
          </span>

          <span className="text-[12px] tracking-widest text-[#1d1d1f] md:text-[14px]">
            BPOM
          </span>

          <span className="text-[12px] tracking-widest text-[#1d1d1f] md:text-[14px]">
            HALAL
          </span>

        </div>

      </div>

    </section>
  );
};

export default Hero;