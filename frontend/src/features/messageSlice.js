import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../socket/socketClient";

// Async Thunks
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ receiverId, content }, { rejectWithValue, getState }) => {
    try {
      const authUser = getState().auth.authUser;
      if (!authUser) {
        throw new Error("User not authenticated");
      }

      // Mock up a message and send it to the API
      const mockMessage = {
        _id: Date.now(),
        sender: authUser._id,
        content,
      };
      const response = await axiosInstance.post("/messages/send", { receiverId, content });
      return { message: mockMessage, response: response.data };
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message || "Error sending message");
    }
  }
);

export const getMessages = createAsyncThunk(
  "messages/messages",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/messages/message/${userId}`);
      return response.data.messages;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
      return rejectWithValue(error.response?.data?.message || "Error fetching messages");
    }
  }
);

// Slice Definition
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: true,
    error: null,
  },
  reducers: {
    subscribeToMessages(state) {
      const socket = getSocket();
      socket.on("newMessage", ({ message }) => {
        const messagesCopy = [...state.messages]; // Clone the state
        messagesCopy.push(message);
        state.messages = messagesCopy; // Update state immutably
      });
    },
    unsubscribeFromMessages() {
      const socket = getSocket();
      socket.off("newMessage");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle sending a message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.messages.push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Handle fetching messages
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messages = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { subscribeToMessages, unsubscribeFromMessages } = messageSlice.actions;
export default messageSlice.reducer;
