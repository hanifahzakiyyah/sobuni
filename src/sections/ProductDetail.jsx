import { useState, useEffect } from "react";
import EditableText from "./EditableText";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ProductDetail({ product, onClose, isAdmin, categories = [], onProductUpdated }) {
  const images = product?.images || [];
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category || ""
  );
  const [hasChanges, setHasChanges] = useState(false);

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  // Format harga menjadi Rupiah
  const formattedPrice = product?.harga
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Number(product.harga))
    : "-";

  const handleCategoryChange = async (newCategory) => {
    const oldCategory = selectedCategory;

    setSelectedCategory(newCategory);

    try {
      await updateDoc(
        doc(db, "products", product.id),
        {
          category: newCategory,
        }
      );

      onProductUpdated?.({
        ...product,
        category: newCategory,
      });

      setHasChanges(true);

    } catch (error) {
      console.error(
        "Gagal mengubah kategori:",
        error
      );

      setSelectedCategory(oldCategory);

      alert("Gagal mengubah kategori.");
    }
  };

  useEffect(() => {
    setSelectedCategory(product?.category || "");
  }, [product?.category]);

  const handleClose = () => {
    if (hasChanges) {
      alert("Perubahan berhasil disimpan.");
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60">

      {/* MODAL CONTAINER */}
      <div
        className="
          relative h-screen w-[80%] ml-[7%] bg-white overflow-y-auto md:overflow-hidden flex flex-col md:flex-row"
      >

        {/* TOMBOL CLOSE */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition hover:bg-black/80"
        >
          ×
        </button>


        {/* ==================================================
            GAMBAR
            Mobile : atas
            Desktop: kiri
        ================================================== */}
        <div
          className="
            relative
            shrink-0

            w-full
            md:w-1/2

            h-[55vh]
            md:h-full

            p-6
            md:p-10

            flex
            items-center
            justify-center

            bg-gray-100
          "
        >

          {/* IMAGE CONTAINER */}
          <div
            className="
              relative
              h-full
              w-full

              overflow-hidden
              rounded-2xl
              bg-white
            "
          >

            {images.length > 0 ? (
              <img
                src={images[currentImage]}
                alt={product?.title || "Product"}
                className="
                  h-full
                  w-full
                  object-contain
                "
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                Belum ada gambar
              </div>
            )}


            {/* PREVIOUS */}
            <button
              onClick={prevImage}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2

                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full
                bg-black/50
                text-2xl
                text-white

                hover:bg-black/70
              "
            >
              ‹
            </button>


            {/* NEXT */}
            <button
              onClick={nextImage}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2

                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full
                bg-black/50
                text-2xl
                text-white

                hover:bg-black/70
              "
            >
              ›
            </button>


            {/* DOTS */}
            <div
              className="
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2

                flex
                gap-2
              "
            >
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`
                    h-2.5
                    w-2.5
                    rounded-full
                    transition-all

                    ${
                      currentImage === index
                        ? "w-6 bg-black"
                        : "bg-gray-400"
                    }
                  `}
                />
              ))}
            </div>

          </div>
        </div>


        {/* ==================================================
            DETAIL PRODUK
            Mobile : bawah
            Desktop: kanan + scroll sendiri
        ================================================== */}
        <div
          className="
            w-full
            md:w-1/2

            md:h-full
            md:overflow-y-auto

            p-6
            md:p-10
          "
        >

          <div className="max-w-2xl">

          {/* CATEGORY + NETTO */}
          <p className="my-5 text-[8px] uppercase tracking-[0.25em] text-[#1d1d1f] md:text-[10px]">

            {isAdmin ? (
              <select
                value={selectedCategory}
                onChange={(e) =>
                  handleCategoryChange(e.target.value)
                }
              >
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.slug}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <span>
                {product?.category}
              </span>
            )}

            {" | "}

            <EditableText
              value={product?.netto}
              field="netto"
              collection="products"
              document={product.id}
              title="Netto"
              isAdmin={isAdmin}
              className="inline"
            >
              {(value) => <span>{value}</span>}
            </EditableText>

          </p>


          {/* TITLE */}
          <EditableText
            value={product?.title}
            field="title"
            collection="products"
            document={product.id}
            title="Product Title"
            isAdmin={isAdmin}
            className="w-full"
          >
            {(value) => (
              <h1 className="font-serif text-xl font-bold leading-tight text-gray-900 md:text-4xl">
                {value}
              </h1>
            )}
          </EditableText>


          {/* KETERANGAN */}
          {product?.keterangan && (
            <EditableText
              value={product.keterangan}
              field="keterangan"
              collection="products"
              document={product.id}
              title="Keterangan"
              isAdmin={isAdmin}
              className="mt-3 w-full"
            >
              {(value) => (
                <p className="text-xs text-gray-500">
                  {value}
                </p>
              )}
            </EditableText>
          )}


          {/* HARGA */}
          <EditableText
            value={product?.harga}
            field="harga"
            collection="products"
            document={product.id}
            title="Harga"
            isAdmin={isAdmin}
            className="my-10 mt-5"
          >
            {(value) => (
              <p className="text-base font-semibold text-gray-900">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(Number(value))}
              </p>
            )}
          </EditableText>


          {/* DESKRIPSI */}
          {product?.deskripsi && (
            <EditableText
              value={product.deskripsi}
              field="deskripsi"
              collection="products"
              document={product.id}
              title="Deskripsi"
              isAdmin={isAdmin}
              multiline={true}
              className="w-full"
            >
              {(value) => (
                <p className="leading-7 text-gray-600 text-xs">
                  {value}
                </p>
              )}
            </EditableText>
          )}


          {/* KEUNGGULAN */}
          {product?.list?.length > 0 && (
            <section className="mt-8">

              <div className="space-y-3">

                {product.list.map((item, index) => (
                  <EditableText
                    key={index}
                    value={item}
                    field="list"
                    collection="products"
                    document={product.id}
                    title={`Keunggulan ${index + 1}`}
                    isAdmin={isAdmin}
                    arrayField="list"
                    arrayIndex={index}
                    arrayProperty=""
                    className="w-full"
                  >
                    {(value) => (
                      <p className="leading-6 text-gray-600 text-xs">
                        {value}
                      </p>
                    )}
                  </EditableText>
                ))}

              </div>

            </section>
          )}


          {/* BUTTON */}
          <div>

            <EditableText
              value="Belanja"
              field="belanja"
              collection="products"
              document={product.id}
              title="Tombol Belanja"
              isAdmin={isAdmin}
              className="my-10 w-full"
            >
              {(value) => (
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center rounded-lg bg-[#1d1d1f] text-[14px] text-white transition-colors duration-300 hover:bg-black md:h-14 md:text-[18px]"
                >
                  {value}
                </button>
              )}
            </EditableText>

            <EditableText
              value="Pemesanan sementara lewat Instagram — DM aja, kami bantu pelan-pelan."
              field="pesananInfo"
              collection="products"
              document={product.id}
              title="Keterangan Pemesanan"
              isAdmin={isAdmin}
              className="-mt-8 w-full"
            >
              {(value) => (
                <p className="text-[10px] text-gray-500">
                  {value}
                </p>
              )}
            </EditableText>

          </div>


          {/* CARA PAKAI */}
          {product?.caraPakai?.length > 0 && (
            <section className="mt-8">

              <h2 className="mb-4 text-xs font-semibold text-gray-900">
                Cara Pakai
              </h2>

              <ol className="space-y-4">

                {product.caraPakai.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-600"
                  >

                    {/* NOMOR */}
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        text-xs
                        font-medium
                        text-gray-700
                      "
                    >
                      {index + 1}
                    </span>


                    {/* TEXT CARA PAKAI */}
                    <EditableText
                      value={item}
                      field="caraPakai"
                      collection="products"
                      document={product.id}
                      title={`Cara Pakai ${index + 1}`}
                      isAdmin={isAdmin}
                      arrayField="caraPakai"
                      arrayIndex={index}
                      arrayProperty=""
                      multiline={true}
                      className="flex-1"
                    >
                      {(value) => (
                        <span className="text-xs">
                          {value}
                        </span>
                      )}
                    </EditableText>

                  </li>
                ))}

              </ol>

            </section>
          )}

        </div>
        </div>

      </div>
    </div>
  );
}