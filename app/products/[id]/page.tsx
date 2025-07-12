type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Detail Produk</h1>
        <p className="text-2xl text-blue-600 bg-blue-100 px-4 py-2 rounded-lg">
          Anda sedang melihat produk dengan ID:{" "}
          <span className="font-mono font-bold">{params.id}</span>
        </p>
        <p className="mt-8 max-w-md">
          Ini adalah halaman dinamis. Konten halaman ini berubah berdasarkan
          nilai `id` yang ada di URL. Anda bisa mencoba mengubah ID di URL
        </p>
      </div>
    </main>
  );
}
