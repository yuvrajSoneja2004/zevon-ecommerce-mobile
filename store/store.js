import { configureStore } from "@reduxjs/toolkit";
import sample from "../slices/sample";

export const GlobalStore = configureStore({
    reducer: {
            sample: sample
    }
})

