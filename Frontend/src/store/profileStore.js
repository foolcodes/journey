import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.MODE === "development"
    ? "http://localhost:5000/api/profile"
    : "/api/profile";

export const useProfileStore = create((set, get) => ({
  isLoading: false,
  error: null,

  updateProfileDetails: async (imageFile, password, name, about) => {
    set({ isLoading: true, error: null });
    try {
      // Create a FormData object for multipart/form-data (file upload)
      const formData = new FormData();

      // Append the file with the field name expected by multer ("avatar")
      if (imageFile) {
        formData.append("avatar", imageFile);
      }

      // Append other form fields
      if (password) formData.append("password", password);
      if (name) formData.append("name", name);
      if (about) formData.append("about", about);

      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error while updating the profile details",
      });
    }
  },
}));
