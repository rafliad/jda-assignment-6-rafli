// app/products/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
// Import hooks dari react-redux dan action dari slice
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/redux/store";
import { fetchProducts } from "../lib/redux/productsSlice";

// Import Komponen B untuk ditampilkan bersama
import ProductSummary from "../components/ProductSummary";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  // --- Bagian Redux ---
  const dispatch = useDispatch<AppDispatch>();
  // Ambil data dari store global, bukan dari local state lagi
  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );
  // --- Akhir Bagian Redux ---

  // State lokal hanya untuk form input
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  // Gunakan useEffect untuk mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    // Hanya fetch jika data belum pernah di-fetch
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = isUpdating ? `/api/products/${isUpdating}` : "/api/products";
    const method = isUpdating ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
      setName("");
      setPrice("");
      setIsUpdating(null);
      // Setelah berhasil, dispatch lagi untuk mengambil data terbaru dari API
      dispatch(fetchProducts());
    }
  };

  const handleUpdate = (product: Product) => {
    setIsUpdating(product.id);
    setName(product.name);
    setPrice(String(product.price));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (response.ok) {
        // Setelah berhasil, dispatch lagi untuk mengambil data terbaru dari API
        dispatch(fetchProducts());
      }
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Kelola Produk dengan Redux</h1>

      {/* Ini adalah Komponen B yang membaca state */}
      <ProductSummary />

      {/* Ini adalah Komponen A yang mengubah state */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Form Produk (Komponen A)</h2>
        <form
          onSubmit={handleSubmit}
          className="mb-8 p-6 bg-white shadow-md rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {isUpdating ? "Update Produk" : "Tambah Produk Baru"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Harga"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              {isUpdating ? "Update" : "Simpan"}
            </button>
          </div>
          {isUpdating && (
            <button
              type="button"
              onClick={() => {
                setIsUpdating(null);
                setName("");
                setPrice("");
              }}
              className="text-sm text-gray-500 mt-2"
            >
              Batal Update
            </button>
          )}
        </form>

        {status === "loading" ? (
          <p className="text-center p-8">Memuat data produk...</p>
        ) : (
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-5 py-5 text-sm">{product.name}</td>
                  <td className="px-5 py-5 text-sm">
                    Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <button
                      onClick={() => handleUpdate(product)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
