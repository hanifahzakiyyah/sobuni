import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "./firebase/config";

import Catalog from "./sections/Catalog";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Why from "./sections/Why";
import Admin from "./sections/Admin";

function App() {
  const [user, setUser] = useState(null);
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Apakah URL sedang berada di mode admin?
  const isAdminMode =
    new URLSearchParams(window.location.search).get("aku") === "admin";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const adminRef = doc(db, "admins", currentUser.uid);
          const adminSnap = await getDoc(adminRef);

          setIsAdminAccount(adminSnap.exists());
        } catch (error) {
          console.error("Gagal mengecek admin:", error);
          setIsAdminAccount(false);
        }
      } else {
        setIsAdminAccount(false);
      }

      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  if (authLoading) {
    return null;
  }

  // Admin UI hanya aktif kalau:
  // 1. URL ?aku=admin
  // 2. Sudah login
  // 3. Akun terdaftar sebagai admin
  const isAdmin = isAdminMode && !!user && isAdminAccount;

  return (
    <>
      <Navbar isAdmin={isAdmin}/>

      <Hero isAdmin={isAdmin} />

      <Catalog isAdmin={isAdmin}/>
      <Why isAdmin={isAdmin} />
      <Footer isAdmin={isAdmin}/>

      {/* ================= LOGIN ================= */}

      {isAdminMode && !user && <Admin />}


      {/* ================= ACCESS DENIED ================= */}

      {isAdminMode && user && !isAdminAccount && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 px-5 backdrop-blur-md">

          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">

            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Access Denied
            </h2>

            <p className="mb-5 text-sm text-gray-500">
              Akun Google ini tidak memiliki akses admin.
            </p>

            <button
              onClick={async () => {
                await signOut(auth);
                window.location.href = "https://sobuni.vercel.app";
              }}
              className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Logout
            </button>

          </div>

        </div>
      )}


      {/* ================= ADMIN CONTROLS ================= */}

      {isAdmin && (
        <div className="fixed bottom-5 right-5 z-9998 flex gap-2">

          <button
            onClick={() => signOut(auth)}
            className="rounded-lg bg-red-500 px-4 py-3 text-white shadow-lg transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      )}

    </>
  );
}

export default App;