import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBloco, TGaragens, TVagasFiltradas } from "@/constrains/models";
import { getBlocos } from "@/api/api-blocos";
import { getGaragens, getVagasDisponiveis } from "@/api/api-garagens";

export const getGaragensThunk = createAsyncThunk(
    'garagens/getGaragensThunk', async () => {
        return await getGaragens()
    }
)
export const getBlocosThunk = createAsyncThunk(
    'garagens/getBlocosThunk', async () => {
        return await getBlocos()
    }
)
export const getVagasDisponiveisThunk = createAsyncThunk(
    'garagens/getVagasDisponiveisThunk', async () => {
        return await getVagasDisponiveis()
    }
)

interface EstadoInicial {
    apiGaragens: TGaragens[],
    blocos: TBloco[],
    vagasDisponiveis: TVagasFiltradas[] /// TODO: alterar
    filtros: {
        blocoSelecionado: number,
    }
}

const estadoInicial: EstadoInicial = {
    apiGaragens: [],  /// VAIR VIR DA API
    vagasDisponiveis: [],
    blocos: [],
    filtros: {
        blocoSelecionado: 0
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
            .addCase(getGaragensThunk.fulfilled, (state, action: PayloadAction<TGaragens[]> )=> {
                if(action.payload) {
                    state.apiGaragens = action.payload
                }
            })
            .addCase(getVagasDisponiveisThunk.fulfilled, (state, action )=> {
                if(action.payload) {
                    state.vagasDisponiveis = action.payload
                }
            })
    }
})

export const {filtroSetBloco} = garagemSlice.actions

export default garagemSlice.reducer
