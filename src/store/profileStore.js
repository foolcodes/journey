import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/profile";

export const useProfileStore = create((set, get) => ({
  isLoading: false,
  error: null,

  updateProfileDetails: async (imageUrl, password, name, about) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}`, {
        imageUrl,
        password,
        name,
        about,
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log("Error while updating the profile details");
      set({
        isLoading: false,
        error: error.message || "Error while updating the profile details",
      });
    }
  },
}));
