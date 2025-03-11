import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/challenges"; // Make sure the endpoint is correct

axios.defaults.withCredentials = true;

export const useChallengeStore = create((set, get) => ({
  error: null,
  isLoading: false,
  data: [],

  getChallenges: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(API_URL);
      set({ data: response.data.data || [], isLoading: false });
      return response.data.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error fetching challenges",
      });
      return null;
    }
  },

  addChallenge: async (title, aim) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}`, { title, aim });
      const newChallenge = response.data.data;

      set((state) => ({
        data: [...state.data, newChallenge],
        isLoading: false,
      }));

      return newChallenge;
    } catch (error) {
      console.log("Error while adding challenge", error.message);
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error adding challenge",
      });

      return null;
    }
  },

  deleteChallenge: async (challengeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/${challengeId}`);
      set((state) => ({
        data: state.data.filter((challenge) => challenge._id !== challengeId),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      console.log("Error while deleting challenge", error);
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error deleting challenge",
      });
      throw error;
    }
  },
}));
