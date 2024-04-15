import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeCreateTest } from './test.type'

interface createTestProps {
    testName: string,
    instructions: string
}

export const createTest = createAsyncThunk(
    typeCreateTest,
    async(data:any)=> {
        try {
            console.log("Inside action ",data.formJson);
            const response = await axios.post('http://localhost:8080/test', data.formJson)
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)
