import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      // Tidak perlu onLoginSuccess().
      // Setelah login berhasil, Firebase akan otomatis
      // memicu onAuthStateChanged() di App.jsx.
    } catch (error) {
      console.error(error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Login dibatalkan.");
      } else {
        setError("Login gagal. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="mb-1 text-2xl font-bold text-gray-900">
          Admin Login
        </h2>

        <p className="mb-6 text-sm text-gray-500">
          Silakan login dengan akun Google untuk mengakses mode admin.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {!loading && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42z"
              />

              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.46-2.36l-3.14-2.45c-.87.58-1.98.92-3.32.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.53A9.75 9.75 0 0 0 12 21.5z"
              />

              <path
                fill="#FBBC05"
                d="M6.51 13.58A5.86 5.86 0 0 1 6.2 12c0-.55.11-1.08.31-1.58V7.89H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.11l3.24-2.53z"
              />

              <path
                fill="#EA4335"
                d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.46 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.73 5.39l3.24 2.53C7.29 8.11 9.45 6.39 12 6.39z"
              />
            </svg>
          )}

          {loading ? "Connecting..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}