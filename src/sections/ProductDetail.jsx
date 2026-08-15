import { useState } from "react";

const ProductDetail = ({ onClose }) => {
  const images = [
    "/prod1.jpg",
    "/prod2.jpg",
    "/prod1.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 z-50 h-dvh overflow-hidden bg-[#f1f2f3]">

      {/* =========================
          CLOSE BUTTON
      ========================== */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-5 top-5 z-60 flex h-10 w-10 items-center justify-center text-[30px] leading-none text-[#1d1d1f] transition-opacity hover:opacity-50"
      >
        ×
      </button>


      {/* =====================================================
          DESKTOP
          LEFT FIXED — RIGHT SCROLL
      ====================================================== */}

      <div className="hidden h-full md:flex">

        {/* =========================
            LEFT — FIXED IMAGE
        ========================== */}
        <div className="relative h-full w-1/2 shrink-0">

          <div className="absolute inset-0 flex items-center justify-center p-3 md:p-14">

            <img
              src={images[currentImage]}
              alt="Gentle Facial Wash"
              className="h-full w-full object-contain"
            />

          </div>


          {/* Previous */}
          <button
            type="button"
            onClick={prevImage}
            aria-label="Gambar sebelumnya"
            className="absolute left-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[22px] text-[#1d1d1f] backdrop-blur-sm transition hover:bg-white"
          >
            ←
          </button>


          {/* Next */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Gambar berikutnya"
            className="absolute right-6 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[22px] text-[#1d1d1f] backdrop-blur-sm transition hover:bg-white"
          >
            →
          </button>


          {/* Dots */}
          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Gambar ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentImage === index
                    ? "w-5 bg-[#1d1d1f]"
                    : "w-2 bg-[#1d1d1f]/30"
                }`}
              />
            ))}
          </div>

        </div>


        {/* =========================
            RIGHT — ONLY THIS SCROLLS
        ========================== */}
        <div className="h-full w-1/2 overflow-y-auto">

          <div className="min-h-full px-10 py-16 lg:px-14">

            <p className="text-[11px] tracking-[0.2em] text-[#1d1d1f] md:text-[13px]">
              FACIAL WASH · 100 ML
            </p>


            <h1 className="mt-7 max-w-175 font-serif text-[36px] leading-[1.05] tracking-[-1.5px] text-[#1d1d1f] lg:text-[52px]">
              Gentle Facial Wash for Normal to Dry Skin
            </h1>


            <p className="mt-4 text-[16px] text-[#555] md:text-[18px]">
              Untuk kulit normal hingga kering
            </p>


            <p className="mt-9 text-[22px] text-[#1d1d1f] md:text-[26px]">
              Rp159.000
            </p>


            {/* Description */}
            <div className="mt-10 max-w-180 text-[16px] leading-[1.7] text-[#1d1d1f] md:text-[18px]">
              <p>
                Pembersih wajah dengan tekstur gel yang bekerja pelan-pelan:
                mengangkat kotoran tanpa mengganggu skin barrier. Tanpa
                pewangi, tanpa alkohol, dan low-irritant — cukup lembut untuk
                dipakai setiap hari, bahkan oleh kulit paling sensitif di rumah.
              </p>
            </div>


            {/* Benefits */}
            <div className="mt-10">

              <div className="border-b border-black/10 py-4">
                <p className="flex items-center gap-4 text-[15px] md:text-[17px]">
                  <span>✓</span>
                  <span>0% fragrance — tanpa pewangi tambahan</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-4">
                <p className="flex items-center gap-4 text-[15px] md:text-[17px]">
                  <span>✓</span>
                  <span>0% alcohol — nggak bikin kering</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-4">
                <p className="flex items-center gap-4 text-[15px] md:text-[17px]">
                  <span>✓</span>
                  <span>No added SLS/SLES — gentle surfactant</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-4">
                <p className="flex items-center gap-4 text-[15px] md:text-[17px]">
                  <span>✓</span>
                  <span>Barrier-first — menenangkan, bukan mengikis</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-4">
                <p className="flex items-center gap-4 text-[15px] md:text-[17px]">
                  <span>✓</span>
                  <span>BPOM · HALAL</span>
                </p>
              </div>

            </div>


            {/* Buy */}
            <a
              href="#"
              className="mt-10 flex h-14 w-full items-center justify-center bg-[#1d1d1f] text-[17px] text-white transition-colors duration-300 hover:bg-black"
            >
              Belanja
            </a>


            <p className="mt-4 text-[13px] leading-relaxed text-[#666] md:text-[15px]">
              Pemesanan sementara lewat Instagram — DM aja, kami bantu
              pelan-pelan.
            </p>


            {/* Cara Pakai */}
            <div className="mt-12 border-b border-black/10 pb-12">

              <p className="text-[11px] tracking-[0.2em] text-[#1d1d1f] md:text-[13px]">
                CARA PAKAI
              </p>

              <ol className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#1d1d1f] md:text-[17px]">

                <li>
                  1. Basahi wajah dengan air.
                </li>

                <li>
                  2. Tuang gel secukupnya, usap lembut ke seluruh wajah.
                </li>

                <li>
                  3. Bilas sampai bersih — nggak perlu digosok keras.
                </li>

                <li>
                  4. Cukup 2x sehari, di pagi dan malam hari.
                </li>

              </ol>

            </div>


            {/* Extra space */}
            <div className="h-20" />

          </div>
        </div>

      </div>


      {/* =====================================================
          MOBILE
          IMAGE FIXED AT TOP + DETAIL SCROLLS BELOW
      ====================================================== */}

      <div className="flex h-full flex-col md:hidden">

        {/* IMAGE AREA */}
        <div className="relative h-[45dvh] shrink-0">

          <div className="absolute inset-0 p-5">

            <img
              src={images[currentImage]}
              alt="Gentle Facial Wash"
              className="h-full w-full object-contain"
            />

          </div>


          {/* Previous */}
          <button
            type="button"
            onClick={prevImage}
            aria-label="Gambar sebelumnya"
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[20px] backdrop-blur-sm"
          >
            ←
          </button>


          {/* Next */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Gambar berikutnya"
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[20px] backdrop-blur-sm"
          >
            →
          </button>


          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`h-2 rounded-full transition-all ${
                  currentImage === index
                    ? "w-5 bg-[#1d1d1f]"
                    : "w-2 bg-[#1d1d1f]/30"
                }`}
              />
            ))}
          </div>

        </div>


        {/* ONLY THIS PART SCROLLS ON MOBILE */}
        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="px-6 py-10">

            <p className="text-[11px] tracking-[0.2em] text-[#1d1d1f]">
              FACIAL WASH · 100 ML
            </p>

            <h1 className="mt-6 font-serif text-[34px] leading-[1.05] tracking-[-1px] text-[#1d1d1f]">
              Gentle Facial Wash for Normal to Dry Skin
            </h1>

            <p className="mt-4 text-[15px] text-[#555]">
              Untuk kulit normal hingga kering
            </p>

            <p className="mt-8 text-[21px] text-[#1d1d1f]">
              Rp159.000
            </p>


            <div className="mt-9 text-[15px] leading-[1.7] text-[#1d1d1f]">
              <p>
                Pembersih wajah dengan tekstur gel yang bekerja pelan-pelan:
                mengangkat kotoran tanpa mengganggu skin barrier. Tanpa
                pewangi, tanpa alkohol, dan low-irritant — cukup lembut untuk
                dipakai setiap hari.
              </p>
            </div>


            {/* Benefits */}
            <div className="mt-9">

              <div className="border-b border-black/10 py-3.5">
                <p className="flex gap-4 text-[14px]">
                  <span>✓</span>
                  <span>0% fragrance — tanpa pewangi tambahan</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-3.5">
                <p className="flex gap-4 text-[14px]">
                  <span>✓</span>
                  <span>0% alcohol — nggak bikin kering</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-3.5">
                <p className="flex gap-4 text-[14px]">
                  <span>✓</span>
                  <span>No added SLS/SLES — gentle surfactant</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-3.5">
                <p className="flex gap-4 text-[14px]">
                  <span>✓</span>
                  <span>Barrier-first — menenangkan, bukan mengikis</span>
                </p>
              </div>

              <div className="border-b border-black/10 py-3.5">
                <p className="flex gap-4 text-[14px]">
                  <span>✓</span>
                  <span>BPOM · HALAL</span>
                </p>
              </div>

            </div>


            <a
              href="#"
              className="mt-9 flex h-14 w-full items-center justify-center bg-[#1d1d1f] text-[16px] text-white"
            >
              Belanja
            </a>


            <p className="mt-4 text-[13px] leading-relaxed text-[#666]">
              Pemesanan sementara lewat Instagram — DM aja, kami bantu
              pelan-pelan.
            </p>


            {/* Cara Pakai */}
            <div className="mt-10 border-b border-black/10 pb-12">

              <p className="text-[11px] tracking-[0.2em]">
                CARA PAKAI
              </p>

              <ol className="mt-6 space-y-4 text-[14px] leading-relaxed">

                <li>
                  1. Basahi wajah dengan air.
                </li>

                <li>
                  2. Tuang gel secukupnya, usap lembut ke seluruh wajah.
                </li>

                <li>
                  3. Bilas sampai bersih — nggak perlu digosok keras.
                </li>

                <li>
                  4. Cukup 2x sehari, di pagi dan malam hari.
                </li>

              </ol>

            </div>

            <div className="h-20" />

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;