"use client";

import { useState, useEffect, FormEvent } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  // Fungsi untuk mengambil data dari API
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk menangani submit form (Add & Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = isUpdating ? `/api/products/${isUpdating}` : "/api/products";
    const method = isUpdating ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    if (response.ok) {
      // Reset form dan state
      setName("");
      setPrice("");
      setIsUpdating(null);
      // Muat ulang data
      fetchProducts();
    }
  };

  // Fungsi untuk memulai proses update
  const handleUpdate = (product: Product) => {
    setIsUpdating(product.id);
    setName(product.name);
    setPrice(String(product.price));
  };

  // Fungsi untuk menghapus data
  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchProducts(); // Muat ulang data
      }
    }
  };

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Kelola Produk</h1>

      {/* Form untuk Tambah & Update */}
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

      {/* Tabel untuk Menampilkan List Produk */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
      </div>
    </main>
  );
}
