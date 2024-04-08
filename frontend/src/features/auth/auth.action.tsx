import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { typeCreateUser, typeLoginUser } from './auth.type'

interface createUserProps {
    name: string,
    email: string,
    password : string,
    role: string
}

export const createUser = createAsyncThunk(
    typeCreateUser,
    async(data : createUserProps)=> {
        try {
            console.log(data);
            const response = await axios.post('http://localhost:8080/auth/signup', data)
            const dataj = await response.data
            return dataj;
        } catch (error) {
            throw error;
        }
    }
)

interface loginProps {
    email: string,
    password : string,
}

export const login = createAsyncThunk(
    typeLoginUser,
    async(data : loginProps)=> {
        try{
            const response = await axios.post('http://localhost:8080/auth/login', data)
            const resData = await response.data
            console.log(resData);
            return resData
        }
        catch(error) {
            throw error;
        }
    }
)