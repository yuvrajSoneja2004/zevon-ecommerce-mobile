import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Dark
  darkTheme: {
    bg: "#18191a",
    fontsCol: "#fff",
    buttons: "#F0EEF1",
  },
  // Light
  lightTheme: {
    bg: "#fff",
    fontsCol: "#000",
    buttons: "#F0EEF1",
  },
  isDarkMode: true,
};

const theme = createSlice({
  name: "globalTheme",
  initialState,
  reducers: {
    toggleTheme(state) {
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    },
  },
});

export const { toggleTheme } = theme.actions;

export default theme.reducer;
