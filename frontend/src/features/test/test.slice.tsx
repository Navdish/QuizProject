import {createSlice} from "@reduxjs/toolkit"
import { createTest} from "./test.action";

interface initialStateProps {
    isLoading: boolean
    error: number | null
}

const initialState : initialStateProps ={
    isLoading : false,
    error: null,
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(createTest.pending, (state, action)=> {
            state.isLoading = true;
        })
        builder.addCase(createTest.fulfilled, (state, action)=> {
            state.isLoading = false;
        })
        builder.addCase(createTest.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.error as number;
        })
        
    }
})

export default testSlice.reducer
