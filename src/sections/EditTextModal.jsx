import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const EditTextModal = ({
  isOpen,
  onClose,
  collection,
  document,
  field,
  title,
  value,
  multiline = false,
  onSaved,
  saveValue,
}) => {
  const [text, setText] = useState(value || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setText(value || "");
      setError("");
    }
  }, [isOpen, value]);

  if (!isOpen) {
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    setError("");

    try {
      // Kalau ada custom save function,
      // gunakan itu.
      if (saveValue) {
        await saveValue(text);
      } else {
        // Default: update field biasa
        const docRef = doc(db, collection, document);

        await updateDoc(docRef, {
          [field]: text,
        });
      }

      if (onSaved) {
        onSaved(text);
      }

      onClose();
    } catch (error) {
      console.error("Gagal menyimpan:", error);
      setError("Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center bg-black/20 px-5 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Ubah tulisan lalu tekan Simpan.
          </p>
        </div>

        {/* Input */}
        {multiline ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            autoFocus
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
          />
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditTextModal;