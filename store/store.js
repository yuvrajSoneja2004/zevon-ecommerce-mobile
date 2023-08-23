import { configureStore } from "@reduxjs/toolkit";
import sample from "../slices/sample";
import theme from "../slices/theme";
import userInfo from "../slices/userInfo";

export const GlobalStore = configureStore({
    reducer: {
            sample: sample,
            theme: theme,
            userInfo: userInfo
    }
})

