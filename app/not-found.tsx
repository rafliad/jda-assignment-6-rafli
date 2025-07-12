import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-8">
      <h1 className="text-9xl font-black text-gray-800">404</h1>
      <h2 className="text-2xl font-bold mt-4 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mb-8">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari.
      </p>
      <Link href="/">
        <span className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
          Kembali ke Beranda
        </span>
      </Link>
    </main>
  );
}
