import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";

const CLOUDINARY_CLOUD_NAME = "bgvgcnti";
const CLOUDINARY_UPLOAD_PRESET = "product_images";

const ImageEditModal = ({
  isOpen,
  onClose,
  collection,
  document,
  field,
  title,
  value,
  onSaved,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(value || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setPreview(value || "");
    }
  }, [isOpen, value]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    try {
      setSaving(true);

      // =========================
      // UPLOAD KE CLOUDINARY
      // =========================

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Upload gambar ke Cloudinary gagal.");
      }

      const cloudinaryData =
        await cloudinaryResponse.json();

      const imageUrl = cloudinaryData.secure_url;

      if (!imageUrl) {
        throw new Error(
          "Cloudinary tidak mengembalikan URL gambar."
        );
      }

      // =========================
      // SIMPAN URL KE FIRESTORE
      // =========================

      const docRef = doc(
        db,
        collection,
        document
      );

      await updateDoc(docRef, {
        [field]: imageUrl,
      });

      // Beritahu EditableImage
      if (onSaved) {
        onSaved(imageUrl);
      }

      onClose();

    } catch (error) {
      console.error(
        "Gagal menyimpan gambar:",
        error
      );

      alert(
        "Gagal menyimpan gambar. Silakan coba lagi."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div
        className="
            fixed
            inset-0
            z-200
            overflow-y-auto
            bg-black/50
            p-4
        "
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >

      <div
        className="
            relative
            mx-auto
            my-4
            w-full
            max-w-lg
            rounded-2xl
            bg-white
            p-6
            shadow-2xl
        "
        >

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="
            absolute
            right-4
            top-4
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          ×
        </button>


        {/* TITLE */}

        <h2 className="mb-6 pr-10 text-xl font-semibold text-gray-900">
          Edit {title || "Gambar"}
        </h2>


        {/* PREVIEW */}

        <div className="mb-6 overflow-hidden rounded-xl bg-gray-100">

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="
                mx-auto
                max-h-100
                w-full
                object-contain
              "
            />
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-gray-400">
              Belum ada gambar
            </div>
          )}

        </div>


        {/* FILE INPUT */}

        <label
          className="
            mb-6
            block
            cursor-pointer
            rounded-lg
            border
            border-dashed
            border-gray-300
            px-4
            py-6
            text-center
            transition
            hover:border-gray-500
            hover:bg-gray-50
          "
        >

          <span className="block text-sm font-medium text-gray-900">
            {selectedFile
              ? selectedFile.name
              : "Pilih gambar"}
          </span>

          <span className="mt-1 block text-xs text-gray-500">
            JPG, PNG, WEBP
          </span>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={saving}
          />

        </label>


        {/* SAVE */}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !selectedFile}
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
            ? "Mengupload gambar..."
            : "Simpan Gambar"}
        </button>

      </div>

    </div>
  );
};

export default ImageEditModal;