import { createSlice } from "@reduxjs/toolkit";


const sampleSlice = createSlice({
    name: 'sample',
    initialState: "Gand",
    reducers: {
        change(state , action){
            return action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { change } = sampleSlice.actions

export default sampleSlice.reducer