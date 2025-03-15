import { create } from "zustand";
import axios from "axios";
const API_URL = "http://localhost:5000/challenges";

axios.defaults.withCredentials = true;

export const useChallengeStore = create((set, get) => ({
  error: null,
  isLoading: false,
  data: [],

  getChallenges: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(API_URL);
      set({
        data: response.data.data || [],
        isLoading: false,
      });
      return response.data.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error fetching challenges",
      });
      return null;
    }
  },

  getAim: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-aim`);
      set({ isLoading: false, aim: response.data.aim });
      return response.data.aim;
    } catch (error) {
      console.log("error fetching aim data");
      set({
        isLoading: false,
        error: error.message || "Error fetching aim message",
      });
    }
  },

  addChallenge: async (title, aim, currentDay) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}`, {
        title,
        aim,
        currentDay,
      });
      const newChallenge = response.data.data;

      set((state) => ({
        data: [...state.data, newChallenge],
        isLoading: false,
      }));

      return newChallenge;
    } catch (error) {
      const errorMessage =
        error.response?.data?.errorType === "ACTIVE_CHALLENGE_EXISTS"
          ? "You already have an active challenge. Complete or abandon it first!"
          : error.response?.data?.message || "Error adding challenge";

      set({
        isLoading: false,
        error: errorMessage,
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

  getChallengeFromChallengeId: async (challengeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${challengeId}`);
      set({ isLoading: false, data: response.data });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(
        "Error fetching challenge data with challenge id",
        error.message
      );
    }
  },

  updateNote: async (updatedNote) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/update-note`, {
        updatedNote,
      });
      console.log(response);
    } catch (error) {
      console.log("Error while updating aim", error);
      set({
        isLoading: false,
        error: error.message || "Challenge must be active to change the AIM!",
      });
    }
  },
}));
