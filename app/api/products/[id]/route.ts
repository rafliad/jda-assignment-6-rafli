import { NextResponse } from "next/server";
// Import data dari file data.ts yang berada satu level di atas
import { products } from "../data";

// Mengambil satu data product berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

// Mengupdate data product berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { name, price } = await request.json();
  const productIndex = products.findIndex((p) => p.id === Number(params.id));

  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  products[productIndex] = {
    ...products[productIndex],
    name,
    price: Number(price),
  };

  return NextResponse.json({
    message: "Product updated successfully",
    product: products[productIndex],
  });
}

// Menghapus data product berdasarkan ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const productIndex = products.findIndex((p) => p.id === Number(params.id));

  if (productIndex === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  products.splice(productIndex, 1); // Gunakan splice untuk menghapus dari array

  return NextResponse.json({ message: "Product deleted successfully" });
}
