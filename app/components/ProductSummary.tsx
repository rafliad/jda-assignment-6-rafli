// components/ProductSummary.tsx
"use client";
import { useSelector } from "react-redux";
// Menggunakan path relatif untuk memastikan file ditemukan
import { RootState } from "../lib/redux/store";

export default function ProductSummary() {
  // Gunakan useSelector untuk mengambil data dari store global
  const { items: products, status } = useSelector(
    (state: RootState) => state.products
  );

  let content;
  if (status === "loading") {
    content = "Memuat jumlah produk...";
  } else if (status === "succeeded") {
    content = `Saat ini ada ${products.length} produk di dalam store.`;
  } else if (status === "failed") {
    content = "Gagal memuat data produk.";
  } else {
    content = "Silakan tambahkan produk pertama Anda.";
  }

  return (
    <div className="p-4 mb-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded-md">
      <h3 className="font-bold">Ringkasan Produk (dari Komponen B)</h3>
      <p>{content}</p>
    </div>
  );
}
