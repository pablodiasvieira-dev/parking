import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Navigation {
    id: number
    title: string
    subtitle: string
}

const navigationInitial: Navigation = {
    id: 1,
    title: "Parking",
    subtitle: "Controle de vagas"
}


export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: navigationInitial,
    reducers: {
        setNavigation: (_, action: PayloadAction<Navigation>) => {
            return action.payload
        }

    }
})


export const {setNavigation} = navigationSlice.actions
export default navigationSlice.reducer
