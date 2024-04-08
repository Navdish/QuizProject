import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/auth/auth.slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import bookSlice from '../features/book/book.slice'
// import issuedSlice from '../features/issued/issued.slice'


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice)

export const store = configureStore({
    reducer: {
        user : persistedReducer,
        // book : bookSlice,
        // issued : issuedSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)