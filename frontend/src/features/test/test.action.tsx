import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeCreateTest } from './test.type'

interface createTestProps {
    testName: string
}

export const createTest = createAsyncThunk(
    typeCreateTest,
    async(data : createTestProps)=> {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:8080/test', data)
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)
