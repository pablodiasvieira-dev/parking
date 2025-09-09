import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Navigation {
    title: string
    subtitle: string
}

const navigationInitial: Navigation = {
    title: "Parking",
    subtitle: "Controle de vagas"
}


export const navigationSlice = createSlice({
    name: 'navigation',
    initialState: navigationInitial,
    reducers: {
        setTitleNavigation: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        setSubTitleNavigation: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload
        }

    }
})


export const {setTitleNavigation, setSubTitleNavigation} = navigationSlice.actions
export default navigationSlice.reducer
