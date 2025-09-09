import { configureStore } from '@reduxjs/toolkit'
import  garagemSlice  from './garagemSlice'
import  navigationSlice from './navigationSlice'

export const store = configureStore( {
    reducer: {
        garagens: garagemSlice,
        navegar: navigationSlice,
    }
    // {
    //     usuarios: [],
    //     garagens: []
    // }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch