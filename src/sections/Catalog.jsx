import { useState } from "react";
import ProductDetail from "./ProductDetail";

const Catalog = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section className="bg-[#f1f2f3] px-6 py-20 md:px-10 md:py-24">

      {/* ================= HEADER ================= */}
      <div className="mx-auto mb-20 text-center">
        <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
          KATALOG
        </p>

        <h2 className="mt-7 font-serif text-[38px] leading-none tracking-[-1.5px] text-[#1d1d1f] md:text-[48px]">
          Produk kami
        </h2>
      </div>


      {/* =========================================================
          PEMBERSIH
      ========================================================= */}

      <div className="mx-auto mb-12 max-w-120 text-center">
        <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
          PEMBERSIH
        </p>

        <div className="mt-6 border-b border-black/20" />
      </div>


      <div className="mx-auto grid max-w-312.5 grid-cols-1 gap-12 md:max-w-200 md:grid-cols-2 md:gap-14">

        {/* Product 1 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod1.jpg"
              alt="Gentle Facial Wash for Normal to Dry Skin"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              FACIAL WASH · 100 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Gentle Facial Wash for Normal to Dry Skin
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Untuk kulit normal hingga kering
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp159.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>


        {/* Product 2 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod2.jpg"
              alt="Gentle Facial Wash for Oily Skin"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              FACIAL WASH · 100 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Gentle Facial Wash for Oily Skin
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Untuk kulit berminyak & berjerawat
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp159.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>

      </div>


      {/* =========================================================
          TONER & ESSENCE
      ========================================================= */}

      <div className="mx-auto mb-12 mt-32 max-w-120 text-center">
        <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
          TONER & ESSENCE
        </p>

        <div className="mt-6 border-b border-black/20" />
      </div>


      <div className="mx-auto grid max-w-312.5 grid-cols-1 gap-12 md:max-w-200 md:grid-cols-2 md:gap-14">

        {/* Product 1 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod1.jpg"
              alt="Hydrating Toner"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              TONER · 100 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Gentle Hydrating Toner
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Untuk menjaga kulit tetap lembap
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp149.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>


        {/* Product 2 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod2.jpg"
              alt="Soothing Essence"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              ESSENCE · 100 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Soothing Skin Essence
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Membantu menenangkan kulit sensitif
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp169.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>

      </div>


      {/* =========================================================
          SERUM
      ========================================================= */}

      <div className="mx-auto mb-12 mt-32 max-w-120 text-center">
        <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
          SERUM
        </p>

        <div className="mt-6 border-b border-black/20" />
      </div>


      <div className="mx-auto grid max-w-312.5 grid-cols-1 gap-12 md:max-w-200 md:grid-cols-2 md:gap-14">

        {/* Product 1 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod1.jpg"
              alt="Barrier Repair Serum"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              SERUM · 30 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Barrier Repair Serum
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Membantu memperkuat skin barrier
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp189.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>


        {/* Product 2 */}
        <article>
          <div className="aspect-square w-full overflow-hidden">
            <img
              src="/prod2.jpg"
              alt="Calming Serum"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="pt-7">
            <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
              SERUM · 30 ML
            </p>

            <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
              Calming Serum
            </h3>

            <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
              Untuk kulit yang mudah kemerahan
            </p>

            <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
              Rp199.000
            </p>

            <button
              type="button"
              onClick={() => setSelectedProduct("calming-serum")}
              className="mt-8 inline-block border-b border-[#1d1d1f] pb-1 text-[12px] tracking-wide text-[#1d1d1f] transition-opacity duration-300 hover:opacity-60 md:text-[14px]"
            >
              Lihat produk
            </button>
          </div>
        </article>

      </div>

      {selectedProduct === "calming-serum" && (
        <ProductDetail
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </section>
  );
};

export default Catalog;