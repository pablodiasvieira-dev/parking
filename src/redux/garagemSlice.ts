import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { vacancyNumber, Vacancy } from "../api/api";
import { TBloco } from "@/constrains/models";
import { getBlocos } from "@/api/api-blocos";

export const getBlocosThunk = createAsyncThunk(
    'garagens/getBlocosThunk', async () => {
        return await getBlocos()
    }
)

interface EstadoInicial {
    apiGaragens: Vacancy[],
    blocos: TBloco[],
    filtros: {
        blocoSelecionado: string,
    }
}

const estadoInicial: EstadoInicial = {
    apiGaragens: vacancyNumber, 
    blocos: [],
    filtros: {
        blocoSelecionado: 'A'
    }

}

export const garagemSlice = createSlice({
    name: 'garagens',
    initialState: estadoInicial,
    reducers: {
        filtroSetBloco: (state, action) => {
            state.filtros.blocoSelecionado = action.payload
        }
        // increment: (state) => {
        //     // state.valor += 1
        //     },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlocosThunk.fulfilled, (state, action: PayloadAction<TBloco[]> )=> {
                if(action.payload) {
                    state.blocos = action.payload
                }
            })
    }
})


export const {filtroSetBloco} = garagemSlice.actions

export default garagemSlice.reducer
