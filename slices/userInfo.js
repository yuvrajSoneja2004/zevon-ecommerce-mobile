import { createSlice } from '@reduxjs/toolkit'



const userInfo = createSlice({
  name: "userInfo",
  initialState: {},
  reducers: {
    getUserInfo(state , action){
        return action.payload;
    }
  }
});

export const {getUserInfo} = userInfo.actions

export default userInfo.reducer