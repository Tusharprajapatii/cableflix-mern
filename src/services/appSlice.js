import { createSlice } from "@reduxjs/toolkit";

const watchLater = JSON.parse(localStorage.getItem("watchLater"));
const item = JSON.parse(localStorage.getItem("item"));
const initialState = {
  search: "",
  videoId: "",
  item: item || {},
  watchLater: watchLater || [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
    getItem: (state, action) => {
      state.item = action.payload;
      localStorage.setItem("item", JSON.stringify(action.payload));
    },
    addWatchLater: (state, action) => {
      const check = state.watchLater.every((i) => i.id !== action.payload.id);
      if (!check) {
        return state;
      }

      state.watchLater.push(action.payload);
      localStorage.setItem("watchLater", JSON.stringify(state.watchLater));
    },
    removeWatchLater: (state, action) => {
      const index = state.watchLater.findIndex((i) => i.id === action.payload);
      state.watchLater.splice(index, 1);
      localStorage.setItem("watchLater", JSON.stringify(state.watchLater));
    },
  },
});
export const {
  setSearch,
  setVideoId,
  getItem,
  addWatchLater,
  removeWatchLater,
} = appSlice.actions;
export default appSlice.reducer;
