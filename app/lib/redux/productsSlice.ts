// lib/redux/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Definisikan tipe data untuk product, sesuaikan jika perlu
type Product = {
  id: number;
  name: string;
  price: number;
};

// Definisikan bentuk state untuk slice ini
interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle", // 'idle' = belum mulai, 'loading' = sedang fetch, 'succeeded' = berhasil, 'failed' = gagal
  error: null,
};

// Buat "thunk" untuk mengambil data dari API statis kita secara asynchronous
// createAsyncThunk akan secara otomatis membuat action types (pending, fulfilled, rejected)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // Panggil API yang sudah kita buat sebelumnya
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Di sini kita bisa menambahkan reducer lain jika ada aksi sinkronus
  },
  // extraReducers menangani aksi yang dibuat di luar slice, seperti dari createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          // Tambahkan produk yang di-fetch ke dalam state
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;
