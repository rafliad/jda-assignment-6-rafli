// Definisikan tipe data untuk product
export type Product = {
  id: number;
  name: string;
  price: number;
};

// Deklarasikan dan ekspor data sebagai satu-satunya sumber kebenaran (Single Source of Truth)
export let products: Product[] = [
  { id: 1, name: "Laptop Gaming", price: 15000000 },
  { id: 2, name: "Mouse Wireless", price: 250000 },
  { id: 3, name: "Keyboard Mechanical", price: 800000 },
];
