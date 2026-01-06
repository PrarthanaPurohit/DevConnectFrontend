import {createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;  //state -> payload 
        },
        removeUser: () => {
            return null;
        }
    },
})

export const { addUser, removeUser } = userSlice.actions; //export actions

export default userSlice.reducer;  //export reducer