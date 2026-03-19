import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchInstagram = createAsyncThunk(
  "analytics/fetchInstagram",
  async () => {
    const response = await api.get("/analytics/instagram");
    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    instagram: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstagram.pending, (state) => {
        if (!state.instagram) {
          state.loading = true;
        }
      })
      .addCase(fetchInstagram.fulfilled, (state, action) => {
        state.instagram = action.payload;
        state.loading = false;
      })
      .addCase(fetchInstagram.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default analyticsSlice.reducer;