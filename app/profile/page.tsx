import Image from "next/image";

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Halaman Profil Saya</h1>
      <Image
        src="/hero-mobile.png"
        alt="Foto Profil"
        width={150}
        height={150}
        className="rounded-full mb-4"
      />
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Rafli Ahmad Denistri</h2>
        <p className="text-lg text-gray-600">Software Engineer</p>
        <p className="mt-4 max-w-md">
          Saya sedang menjalani program Jabar Digital Academy
        </p>
      </div>
    </main>
  );
}
