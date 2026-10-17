import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state,action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;  //remove only one id 
        },
    }
})

export default requestSlice.reducer;

export const {addRequests, removeRequest} = requestSlice.actions;