export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Tentang Aplikasi Ini</h1>
        <p className="mt-4 max-w-2xl text-lg">
          Aplikasi ini adalah contoh proyek Next.js untuk memenuhi tugas JDA.
          Proyek ini mendemonstrasikan pembuatan halaman statis.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Dibuat dengan Next.js App Router dan Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
