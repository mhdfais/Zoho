import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const checkZohoConnection = createAsyncThunk(
  "zoho/checkConnection",
  async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/zoho/status`);
    const data = await res.json();
    return data.connected;
  }
);

const zohoSlice = createSlice({
  name: "zoho",
 initialState: {
    connected: false,
    loading: true, 
  },
  reducers: {
    logout: (state) => {
      state.connected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkZohoConnection.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkZohoConnection.fulfilled, (state, action) => {
        state.connected = action.payload;
        state.loading = false;
      })
      .addCase(checkZohoConnection.rejected, (state) => {
        state.connected = false;
        state.loading = false;
      });
  },
});

export const { logout } = zohoSlice.actions;
export default zohoSlice.reducer;
