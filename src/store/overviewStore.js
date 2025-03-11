import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/overview";

export const useOverviewStore = create((set, get) => ({
  isLoading: false,
  data: [],
  error: null,
  presentDay: null,

  getCurrentDay: async (currentDate) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}`, { currentDate });

      set({ isLoading: false });
      return response.data.presentDay;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Error while fetching current Day",
      });
      console.log("Error while fetching current day");
    }
    return null;
  },
}));
