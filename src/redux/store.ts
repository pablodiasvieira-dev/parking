import { configureStore } from '@reduxjs/toolkit'
import  garagemSlice  from './garagemSlice'

export const store = configureStore( {
    reducer: {
        garagens: garagemSlice
    }
    // {
    //     usuarios: [],
    //     garagens: []
    // }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch