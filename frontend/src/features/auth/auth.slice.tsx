import {createSlice} from "@reduxjs/toolkit"
import { createUser, login } from "./auth.action";

interface initialStateProps {
    isLoading: boolean
    user: userProps 
    error: number | null
}

const initialState : initialStateProps ={
    isLoading : false,
    user: {
        _id: "",
        name: "",
        email: "",
        role: ""
    },
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createUser.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(createUser.fulfilled, (state, action)=> {
            state.isLoading = false;
        })
        builder.addCase(createUser.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error as number;
        })
        builder.addCase(login.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = action.payload.user.user;
            state.error = null;
        })
        builder.addCase(login.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error as number;
        })
    }
})

export default authSlice.reducer
