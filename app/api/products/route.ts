import { NextResponse } from "next/server";
// Import data dari file data.ts
import { products } from "./data";

// Mengambil semua data products
export async function GET() {
  return NextResponse.json(products);
}

// Menambahkan data product baru
export async function POST(request: Request) {
  const { name, price } = await request.json();
  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
  };
  // Perubahan di sini akan memodifikasi array yang diimpor
  products.push(newProduct);

  return NextResponse.json(
    { message: "Product created successfully", product: newProduct },
    { status: 201 }
  );
}
