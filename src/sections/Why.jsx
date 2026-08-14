const Why = () => {
  return (
    <section className="bg-[#f1f2f3] px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-312.5 grid-cols-1 md:grid-cols-2">

        {/* Image */}
        <div className="aspect-square w-full overflow-hidden">
          <img
            src="/hero.png"
            alt="Sbcskin skincare"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
          
          <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
            KENAPA SBCSKIN
          </p>

          <h2 className="mt-7 max-w-175 font-serif text-[38px] leading-[1.05] tracking-[-1.5px] text-[#1d1d1f] md:text-[48px]">
            Skincare nggak harus keras buat bekerja.
          </h2>

          <div className="mt-8 max-w-175 space-y-7 text-[16px] leading-[1.7] text-[#1d1d1f] md:text-[18px]">

            <p>
              Kami percaya kulit yang sehat dimulai dari skin barrier
              yang dirawat, bukan dipaksa. Karena itu semua formula
              Sbcskin dibuat tanpa pewangi, tanpa alkohol, dan
              low-irritant — cukup lembut untuk kulit paling sensitif
              di rumah, dari anak sampai orang tua.
            </p>

            <p>
              Satu botol yang sama, bisa dipakai sekeluarga. Pelan-pelan,
              tapi pasti.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Why;