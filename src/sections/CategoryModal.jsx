import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import EditableText from "./EditableText";

const CategoryModal = ({
  isOpen,
  onClose,
  categories = [],
  onSaved,
  isAdmin,
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================
  // GENERATE SLUG
  // =========================

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-&]/g, "");
  };

  // =========================
  // NAMA KATEGORI
  // =========================

  const handleNameChange = (e) => {
    const value = e.target.value;

    setName(value);
    setSlug(generateSlug(value));
  };

  // =========================
  // TAMBAH KATEGORI
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama kategori wajib diisi.");
      return;
    }

    if (!slug.trim()) {
      alert("Slug kategori wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(
        collection(db, "categories"),
        {
          name: name.trim(),
          slug: slug.trim(),
        }
      );

      // Refresh categories di Catalog
      if (onSaved) {
        await onSaved();
      }

      // Reset form
      setName("");
      setSlug("");

      alert("Kategori berhasil ditambahkan.");

    } catch (error) {
      console.error(
        "Gagal menambahkan kategori:",
        error
      );

      alert(
        "Gagal menambahkan kategori. Silakan coba lagi."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // HAPUS KATEGORI
  // =========================

  const handleDeleteCategory = async (category) => {
    const confirmed = window.confirm(
      `pastiin kategori "${category.name}" ini ga lagi dipakai produk manapun. soale klo kategori dihapus padahal algi dipakai suatu produk, nnti produknya ga bisa muncul di katalog. jadi produknya diganti dlu aja kategorinya.`
    );

    if (!confirmed) return;

    try {
      setSaving(true);

      await deleteDoc(
        doc(db, "categories", category.id)
      );

      // Refresh categories di Catalog
      if (onSaved) {
        await onSaved();
      }

      alert("Kategori berhasil dihapus.");

    } catch (error) {
      console.error(
        "Gagal menghapus kategori:",
        error
      );

      alert(
        "Gagal menghapus kategori. Silakan coba lagi."
      );

    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >

      <div
        className="
          relative
          max-h-[90vh]
          w-[80%]
          overflow-y-auto
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
          ml-[-10%]
        "
      >

        {/* =========================
            CLOSE
        ========================= */}

        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            text-2xl
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-900
          "
        >
          ×
        </button>


        {/* =========================
            TITLE
        ========================= */}

        <h2 className="mb-8 pr-10 text-base font-semibold text-gray-900">
          Kelola Kategori
        </h2>


        {/* =========================
            DAFTAR KATEGORI
        ========================= */}

        <section>

          <h3 className="mb-4 text-sm font-semibold text-gray-500">
            Kategori Saat Ini
          </h3>


          {categories.length > 0 ? (

            <div className="space-y-3">

              {categories.map((category) => (

                <div
                  key={category.id}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
                  "
                >

                  <div className="flex items-center justify-between gap-3">

                    <EditableText
                      value={category.name}
                      field="name"
                      collection="categories"
                      document={category.id}
                      title="Nama Kategori"
                      isAdmin={isAdmin}
                      className="flex-1 mr-5"
                    >
                      {(value) => (
                        <div className="pr-2">

                          <p className=" text-gray-900 text-[12px] md:text-[14px]">
                            {value}
                          </p>

                          <p className="mt-1 text-[10px] text-gray-400">
                            {category.slug}
                          </p>

                        </div>
                      )}
                    </EditableText>


                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCategory(category)
                        }
                        disabled={saving}
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-red-500
                          transition
                          hover:bg-red-50
                          hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                        title="Hapus kategori"
                      >
                        🗑️
                      </button>
                    )}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="rounded-lg bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
              Belum ada kategori.
            </p>

          )}

        </section>


        {/* =========================
            PEMBATAS
        ========================= */}

        <div className="my-8 border-t border-gray-200" />


        {/* =========================
            TAMBAH KATEGORI
        ========================= */}

        <section>

          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Tambah Kategori
          </h3>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAMA */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Nama Kategori
              </label>

              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Contoh: Facial Wash"
                disabled={saving}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-gray-700
                  disabled:bg-gray-100
                  text-xs
                "
              />

            </div>


            {/* SLUG */}

            <div>

              <label className="mb-2 block text-xs font-medium text-gray-900">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                placeholder="facial-wash"
                disabled={saving}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-300
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-gray-700
                  disabled:bg-gray-100
                  text-xs
                "
              />

              <p className="mt-2 text-[10px] text-gray-500">
                ga usah hirauin slugnya. otomatis terisi kok itu
              </p>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              disabled={saving}
              className="
                w-full
                rounded-lg
                bg-[#1d1d1f]
                px-4
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-black
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {saving
                ? "Menyimpan..."
                : "Tambah Kategori"}
            </button>

          </form>

        </section>

      </div>

    </div>
  );
};

export default CategoryModal;