import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/api/overview";

export const useOverviewStore = create((set, get) => ({
  isLoading: false,
  challengeData: [],
  error: null,
  presentDay: null,
  dailyHours: 0,
  monthlyHours: 0,
  weeklyHours: 0,
  totalHours: 0,

  getCurrentDay: async (currentDate) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/current-day`, {
        currentDate,
      });

      set({ isLoading: false });
      return response.data;
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

  addDay: async (day, hours, notes) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/add-day`, { day, hours, notes });
      set({ isLoading: false });
    } catch (error) {
      console.log("Error while adding the day data!");
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error while adding the day!";
      set({ isLoading: false, error: errorMessage });
      return errorMessage; // Return the extracted error message
    }
  },

  getChallengeData: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({
        isLoading: false,
        challengeData: response.data.data,
        dailyHours: response.data.dailyHours,
        monthlyHours: response.data.monthlyHours,
        weeklyHours: response.data.weeklyHours,
        totalHours: response.data.totalHours,
      });
      return response.data.data;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error while getting the data!",
      });
      throw error;
    }
  },

  updateTitle: async (newTitle, challengeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/update-title`, {
        newTitle,
        challengeId,
      });

      set({ isLoading: false });
      return `Title updated successfully ${response}`;
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Error updating title!",
      });
    }
  },

  changeChallengeStatus: async (status, challengeId) => {
    set({ isLoading: true, error: false });
    try {
      const response = await axios.post(`${API_URL}/change-status`, {
        status,
        challengeId,
      });
      set({ isLoading: false });
    } catch (error) {
      console.log("Error while changing status ", error.message);
      set({
        isLoading: false,
        error: error.message || "Error while changing status",
      });
    }
  },
}));
