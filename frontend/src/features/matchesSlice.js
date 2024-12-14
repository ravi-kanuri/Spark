import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socketClient";

// Async Thunks
export const getMyMatches = createAsyncThunk("matches/getMyMatches", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/matches");
    return response.data.matches;
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    return rejectWithValue(error.response?.data?.message || "Error fetching matches");
  }
});

export const getUserProfiles = createAsyncThunk("matches/getUserProfiles", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/matches/userProfiles");
    return response.data.users;
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    return rejectWithValue(error.response?.data?.message || "Error fetching user profiles");
  }
});

export const swipeLeft = createAsyncThunk("matches/swipeLeft", async (user, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`/matches/left/${user._id}`);
    return "passed";
  } catch (error) {
    toast.error("Failed to swipe left");
    return rejectWithValue("Error swiping left");
  }
});

export const swipeRight = createAsyncThunk("matches/swipeRight", async (user, { rejectWithValue }) => {
  try {
    await axiosInstance.post(`/matches/right/${user._id}`);
    return "liked";
  } catch (error) {
    toast.error("Failed to swipe right");
    return rejectWithValue("Error swiping right");
  }
});

const matchSlice = createSlice({
  name: "matches",
  initialState: {
    matches: [],
    userProfiles: [],
    isLoadingMyMatches: false,
    isLoadingUserProfiles: false,
    swipeFeedback: null,
    error: null,
  },
  reducers: {
    subscribeToNewMatches(state) {
      try {
        const socket = getSocket();
        socket.on("newMatch", (newMatch) => {
          state.matches.push(newMatch);
          toast.success("You got a new match!");
        });
      } catch (error) {
        console.error("Error subscribing to new matches:", error);
      }
    },
    unsubscribeFromNewMatches(state) {
      try {
        const socket = getSocket();
        socket.off("newMatch");
      } catch (error) {
        console.error("Error unsubscribing from new matches:", error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Get My Matches
      .addCase(getMyMatches.pending, (state) => {
        state.isLoadingMyMatches = true;
      })
      .addCase(getMyMatches.fulfilled, (state, action) => {
        state.isLoadingMyMatches = false;
        state.matches = action.payload;
      })
      .addCase(getMyMatches.rejected, (state, action) => {
        state.isLoadingMyMatches = false;
        state.error = action.payload;
      })
      // Get User Profiles
      .addCase(getUserProfiles.pending, (state) => {
        state.isLoadingUserProfiles = true;
      })
      .addCase(getUserProfiles.fulfilled, (state, action) => {
        state.isLoadingUserProfiles = false;
        state.userProfiles = action.payload;
      })
      .addCase(getUserProfiles.rejected, (state, action) => {
        state.isLoadingUserProfiles = false;
        state.error = action.payload;
      })
      // Swipe Left
      .addCase(swipeLeft.fulfilled, (state, action) => {
        state.swipeFeedback = action.payload;
      })
      .addCase(swipeLeft.rejected, (state) => {
        state.swipeFeedback = null;
      })
      // Swipe Right
      .addCase(swipeRight.fulfilled, (state, action) => {
        state.swipeFeedback = action.payload;
      })
      .addCase(swipeRight.rejected, (state) => {
        state.swipeFeedback = null;
      });
  },
});

// Export actions and reducer
export const { resetSwipeFeedback, subscribeToNewMatches, unsubscribeFromNewMatches } = matchSlice.actions;
export default matchSlice.reducer;
