import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase/config";
import ProductDetail from "./ProductDetail";

import AddProductModal from "./AddProductModal";
import CategoryModal from "./CategoryModal";


const Catalog = ({isAdmin}) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const fetchCatalog = async () => {
    try {
      const [categoriesSnap, productsSnap] = await Promise.all([
        getDocs(collection(db, "categories")),
        getDocs(collection(db, "products")),
      ]);

      const categoriesData = categoriesSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const productsData = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCategories(categoriesData);
      setProducts(productsData);

    } catch (error) {
      console.error("Gagal mengambil katalog:", error);

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCatalog();
  }, []);

  if (loading) {
    return null;
  }
  const handleDeleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus produk "${product.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteDoc(
        doc(db, "products", product.id)
      );

      // Refresh katalog setelah produk dihapus
      await fetchCatalog();

      // Kalau produk yang sedang dibuka adalah produk yang dihapus
      if (selectedProduct?.id === product.id) {
        setSelectedProduct(null);
      }

      alert("Produk berhasil dihapus.");

    } catch (error) {
      console.error(
        "Gagal menghapus produk:",
        error
      );

      alert(
        "Gagal menghapus produk. Silakan coba lagi."
      );
    }
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  

  return (
    <section className="bg-[#f1f2f3] px-6 py-20 md:px-10 md:py-24" id="catalog">

      {/* ================= HEADER ================= */}
      <div className="mx-auto mb-20 text-center">
        <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
          KATALOG
        </p>

        <h2 className="mt-7 font-serif text-[38px] leading-none tracking-[-1.5px] text-[#1d1d1f] md:text-[48px]">
          Produk kami
        </h2>
        {isAdmin && (
          <div className="flex flex-row w-40 items-center justify-center m-auto gap-2 mt-5"> 
            <button
              onClick={() => setShowAddProduct(true)}
              className="flex h-12 w-3xl items-center justify-center text-[10px] transition-colors duration-300 md:text-[12px] rounded-lg border"
            >
              Tambah Produk ✏️
            </button>
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex h-12 w-3xl items-center justify-center text-[10px] transition-colors duration-300 md:text-[12px] rounded-lg border"
            >
              Tambah Categories ✏️
            </button>
          </div>
        )}

        <AddProductModal
          isOpen={showAddProduct}
          onClose={() => setShowAddProduct(false)}
          onProductAdded={fetchCatalog}
        />

        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          categories={categories}
          onSaved={fetchCatalog}
          isAdmin={isAdmin}
        />

      </div>

      {/* ================= CATEGORIES ================= */}

      {categories.map((category) => {

        // Ambil produk yang termasuk kategori ini
        const categoryProducts = products.filter(
          (product) => product.category === category.slug
        );

        // Kalau kategori tidak punya produk,
        // jangan tampilkan kategorinya.
        if (categoryProducts.length === 0) {
          return null;
        }

        return (
          <div key={category.id} className="mb-20">

            {/* ================= CATEGORY HEADER ================= */}

            <div className="mx-auto mb-12 max-w-120 text-center">

              <p className="text-[12px] tracking-[0.25em] text-[#1d1d1f] md:text-[14px]">
                {category.name}
              </p>

              <div className="mt-6 border-b border-black/20" />

            </div>


            {/* ================= PRODUCTS ================= */}

            <div className="mx-auto grid max-w-312.5 grid-cols-1 gap-12 md:max-w-200 md:grid-cols-2 md:gap-14 p-10">

              {categoryProducts.map((product) => (

                <article key={product.id}>

                  {/* IMAGE */}

                  <div className="aspect-square w-full overflow-hidden">

                    <img
                      src={product.images?.[0] || "/prod1.jpg"}
                      alt={product.title || "Product"}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  {/* INFO */}

                  <div className="pt-7">

                    <p className="text-[10px] tracking-[0.2em] text-[#1d1d1f] md:text-[12px]">
                      {product.category?.replaceAll("-", " ").toUpperCase()}
                    </p>


                    <h3 className="mt-6 max-w-150 font-serif text-[20px] leading-tight tracking-[-0.5px] text-[#1d1d1f] md:text-[28px]">
                      {product.title}
                    </h3>


                    <p className="mt-3 text-[12px] text-[#555] md:text-[16px]">
                      {product.keterangan}
                    </p>


                    <p className="mt-5 text-[15px] text-[#1d1d1f] md:text-[18px]">
                      Rp{Number(product.harga).toLocaleString("id-ID")}
                    </p>


                    <div className="mt-8 flex items-center gap-5">

                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="
                          border-b
                          border-[#1d1d1f]
                          pb-1
                          text-[12px]
                          tracking-wide
                          text-[#1d1d1f]
                          transition-opacity
                          duration-300
                          hover:opacity-60
                          md:text-[14px]
                        "
                      >
                        Lihat produk
                      </button>


                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product)}
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-red-500
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                          "
                          title="Hapus produk"
                        >
                          🗑️
                        </button>
                      )}

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </div>
        );
      })}


      {/* ================= PRODUCT DETAIL ================= */}

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdated={handleProductUpdated}
          categories={categories}
          isAdmin={isAdmin}
        />
      )}

    </section>
  );
};

export default Catalog;