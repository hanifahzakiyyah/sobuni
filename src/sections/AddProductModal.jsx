import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/config";

const CLOUDINARY_CLOUD_NAME = "bgvgcnti";
const CLOUDINARY_UPLOAD_PRESET = "product_images";

const AddProductModal = ({ isOpen, onClose, onProductAdded}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [harga, setHarga] = useState("");
  const [netto, setNetto] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [categories, setCategories] = useState([]);

  const [list, setList] = useState([""]);
  const [caraPakai, setCaraPakai] = useState([""]);

  const [images, setImages] = useState([]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "categories")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchCategories();
  }, []);


  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const remainingSlots = 3 - images.length;

    const selectedFiles = files.slice(0, remainingSlots);

    const newImages = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Supaya file yang sama bisa dipilih lagi
    e.target.value = "";
  };


  const removeImage = (index) => {
    setImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return prev.filter((_, i) => i !== index);
    });
  };


  // =====================================================
  // LIST
  // =====================================================

  const updateListItem = (index, value) => {
    setList((prev) =>
      prev.map((item, i) =>
        i === index ? value : item
      )
    );
  };


  const addListItem = () => {
    setList((prev) => [...prev, ""]);
  };


  const removeListItem = (index) => {
    setList((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };


  // =====================================================
  // CARA PAKAI
  // =====================================================

  const updateCaraPakai = (index, value) => {
    setCaraPakai((prev) =>
      prev.map((item, i) =>
        i === index ? value : item
      )
    );
  };


  const addCaraPakai = () => {
    setCaraPakai((prev) => [...prev, ""]);
  };


  const removeCaraPakai = (index) => {
    setCaraPakai((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };


  // =====================================================
  // UPLOAD SATU GAMBAR KE CLOUDINARY
  // =====================================================

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      console.error(
        "Cloudinary upload error:",
        errorData
      );

      throw new Error(
        "Gagal mengupload gambar ke Cloudinary."
      );
    }

    const data = await response.json();

    return data.secure_url;
  };


  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Nama produk wajib diisi.");
      return;
    }

    if (!harga.trim()) {
      alert("Harga produk wajib diisi.");
      return;
    }

    if (images.length === 0) {
      alert("Minimal upload 1 gambar produk.");
      return;
    }

    try {
      setIsSaving(true);


      // =================================================
      // 1. UPLOAD SEMUA GAMBAR KE CLOUDINARY
      // =================================================

      const uploadedImageUrls = await Promise.all(
        images.map((image) =>
          uploadImageToCloudinary(image.file)
        )
      );


      // =================================================
      // 2. SETELAH SEMUA GAMBAR BERHASIL,
      //    BARU SIMPAN PRODUK KE FIRESTORE
      // =================================================

      await addDoc(
        collection(db, "products"),
        {
          title: title.trim(),

          category: category.trim(),

          harga: harga.trim(),

          netto: netto.trim(),

          keterangan: keterangan.trim(),

          deskripsi: deskripsi.trim(),

          list: list
            .map((item) => item.trim())
            .filter(Boolean),

          caraPakai: caraPakai
            .map((item) => item.trim())
            .filter(Boolean),

          images: uploadedImageUrls,

          createdAt: new Date(),
        }
      );

      if (onProductAdded) {
        await onProductAdded();
      }


      // =================================================
      // SELESAI
      // =================================================

      alert("Produk berhasil ditambahkan.");

      handleReset();

      onClose();

    } catch (error) {

      console.error(
        "Gagal menambahkan produk:",
        error
      );

      alert(
        error?.message ||
        "Gagal menambahkan produk."
      );

    } finally {

      setIsSaving(false);

    }
  };


  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {

    images.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });

    setTitle("");
    setCategory("");
    setHarga("");
    setNetto("");
    setKeterangan("");
    setDeskripsi("");

    setList([""]);
    setCaraPakai([""]);
    setImages([]);
  };


  // =====================================================
  // MODAL CLOSED
  // =====================================================

  if (!isOpen) {
    return null;
  }


  return (
    <div
      className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-black/60
        p-4
      "
    >

      <div
        className="
          relative
          flex
          max-h-[95vh]
          w-[85%]
          ml-[-7%]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            px-6
            py-4
          "
        >

          <h2 className="text-xl font-semibold text-gray-900">
            Tambah Produk
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-xl
              text-gray-600
              transition
              hover:bg-gray-200
            "
          >
            ×
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-6"
        >

          <div className="space-y-6">


            {/* =================================================
                GAMBAR
            ================================================= */}

            <div>

              <label className="mb-3 block text-xs font-medium text-gray-900">
                Gambar Produk
              </label>

              <div className="grid grid-cols-3 gap-3">

                {images.map((image, index) => (
                  <div
                    key={index}
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-xl
                      bg-gray-100
                    "
                  >

                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="
                        absolute
                        right-2
                        top-2
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        bg-black/60
                        text-white
                        transition
                        hover:bg-black/80
                      "
                    >
                      ×
                    </button>

                  </div>
                ))}


                {/* =================================================
                    ADD IMAGE
                ================================================= */}

                {images.length < 3 && (
                  <label
                    className="
                      flex
                      aspect-square
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border-2
                      border-dashed
                      border-gray-300
                      text-gray-400
                      transition
                      hover:border-gray-500
                      hover:text-gray-600
                    "
                  >

                    <span className="text-3xl">
                      +
                    </span>

                    <span className="mt-1 text-[10px]">
                      Tambah gambar
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>
                )}

              </div>

              <p className="mt-2 text-[10px] text-gray-400">
                Maksimal 3 gambar · JPG, PNG, atau WebP
              </p>

            </div>


            {/* =================================================
                TITLE
            ================================================= */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Nama Produk
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Gentle Facial Wash for Normal to Dry Skin"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-gray-700
                  text-xs
                "
              />

            </div>


            {/* =================================================
                CATEGORY + NETTO
            ================================================= */}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    focus:border-gray-700
                    text-xs
                  "
                >
                  <option value="">
                    Pilih kategori
                  </option>

                  {categories.map((item) => (
                    <option
                      key={item.id}
                      value={item.slug}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>

              </div>


              <div>

                <label className="mb-2 block text-xs font-medium text-gray-900">
                  Netto
                </label>

                <input
                  type="text"
                  value={netto}
                  onChange={(e) => setNetto(e.target.value)}
                  placeholder="100ml"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    focus:border-gray-700
                    text-xs
                  "
                />

              </div>

            </div>


            {/* =================================================
                HARGA
            ================================================= */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Harga
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="159000"
                className="
                text-xs
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-gray-700
                "
              />

            </div>


            {/* =================================================
                KETERANGAN
            ================================================= */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Keterangan
              </label>

              <input
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Untuk kulit normal hingga kering"
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-gray-700
                  text-xs
                "
              />

            </div>


            {/* =================================================
                DESKRIPSI
            ================================================= */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Deskripsi
              </label>

              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                rows={5}
                placeholder="Deskripsi produk..."
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  focus:border-gray-700
                  text-xs
                "
              />

            </div>


            {/* =================================================
                KEUNGGULAN
            ================================================= */}

            <div>

              <div className="mb-3 flex items-center justify-between">

                <label className="text-xs font-medium text-gray-900">
                  Keunggulan
                </label>

                <button
                  type="button"
                  onClick={addListItem}
                  className="
                    text-xs
                    font-medium
                    text-gray-700
                    hover:underline
                  "
                >
                  + Tambah
                </button>

              </div>


              <div className="space-y-3">

                {list.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >

                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        updateListItem(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="✓ 0% fragrance — tanpa pewangi tambahan"
                      className="
                        w-full
                        text-xs
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-gray-700
                      "
                    />

                    {list.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(index)
                        }
                        className="
                          shrink-0
                          rounded-lg
                          px-3
                          text-gray-400
                          hover:bg-gray-100
                          hover:text-gray-700
                        "
                      >
                        ×
                      </button>
                    )}

                  </div>
                ))}

              </div>

            </div>


            {/* =================================================
                CARA PAKAI
            ================================================= */}

            <div>

              <div className="mb-3 flex items-center justify-between">

                <label className="text-xs font-medium text-gray-900">
                  Cara Pakai
                </label>

                <button
                  type="button"
                  onClick={addCaraPakai}
                  className="
                    text-xs
                    font-medium
                    text-gray-700
                    hover:underline
                  "
                >
                  + Tambah
                </button>

              </div>


              <div className="space-y-3">

                {caraPakai.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-gray-100
                        text-xs
                        font-medium
                        text-gray-600
                      "
                    >
                      {index + 1}
                    </div>

                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        updateCaraPakai(
                          index,
                          e.target.value
                        )
                      }
                      placeholder="Basahi wajah dengan air."
                      className="
                        w-full
                        text-xs
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-gray-700
                      "
                    />

                    {caraPakai.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeCaraPakai(index)
                        }
                        className="
                          shrink-0
                          rounded-lg
                          px-3
                          text-gray-400
                          hover:bg-gray-100
                          hover:text-gray-700
                        "
                      >
                        ×
                      </button>
                    )}

                  </div>
                ))}

              </div>

            </div>


            {/* =================================================
                SUBMIT
            ================================================= */}

            <div className="flex gap-3 border-t pt-6">

              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="
                  flex-1
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-700
                  transition
                  hover:bg-gray-50
                  h-12
                  text-xs
                "
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="
                  flex-1
                  rounded-lg
                  bg-[#1d1d1f]
                  h-12
                  text-xs
                  text-white
                  transition
                  hover:bg-black
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {isSaving
                  ? "Mengupload & Menyimpan..."
                  : "Tambah Produk"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProductModal;