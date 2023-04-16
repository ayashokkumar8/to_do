import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            return state = action.payload
          },
          clearUser: (state) => {
            return state = []
          }
    }
});

export const { addUser, clearUser } = userReducer.actions;
export default userReducer.reducer;