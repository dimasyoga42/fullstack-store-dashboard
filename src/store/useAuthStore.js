import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isProducting: false,
  products: [],
  product: null,
    isOrder: false,
    order: [], 
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true }); // typo diperbaiki
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoggingIn: false }); 
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/logout");
      set({ authUser: null });
    } catch (error) {
      console.log(error);
    }
  },

  fetchProducts: async () => {
    set({ isProducting: true });
    try {
      const res = await axiosInstance.get("/dashboard/admin/product");
      if (res.data && Array.isArray(res.data.product)) {
        set({ products: res.data.product });
      } else {
        console.error("Unexpected response format:", res.data);
        set({ products: [] });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
    } finally {
      set({ isProducting: false });
    }
  },
  fetchOrder: async () => {
    set({ isOrder: true });
    try {
      const res = await axiosInstance.get("/dashboard/admin/order");
      if (res.data && Array.isArray(res.data.orders)) {
        set({ order: res.data.orders });
      } else {
        console.error("Unexpected response format:", res.data);
        set({ order: [] });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      set({ order: [] });
    } finally {
      set({ isOrder: false });
    }
  },
}));
