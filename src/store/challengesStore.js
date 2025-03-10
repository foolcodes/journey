import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/challenge";

axios.defaults.withCredentials = true;

export const useChallengeStore = create({
  error: null,
  isLoading: false,
  data: null,
  message: null,

  getChallenges: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ data: response.data, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error fetching challenges",
      });
      throw error;
    }
  },
});
