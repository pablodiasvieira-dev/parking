import { createSlice } from "@reduxjs/toolkit";
import { vacancyNumber, Vacancy } from "../api/api";

interface Bloco {
    id: number;
    siglaBloco: string;
    nomeBloco: string
}

const nomeBloco: Bloco[] = [
    { id: 0, siglaBloco: "A", nomeBloco: "Bloco A" },
    { id: 1, siglaBloco: "B", nomeBloco: "Bloco B" },
    { id: 2, siglaBloco: "C", nomeBloco: "Bloco C" },
    { id: 3, siglaBloco: "D", nomeBloco: "Bloco D" },
    { id: 4, siglaBloco: "E", nomeBloco: "Bloco E" },
    { id: 5, siglaBloco: "F", nomeBloco: "Bloco F" },
    { id: 6, siglaBloco: "G", nomeBloco: "Bloco G" },
    { id: 7, siglaBloco: "H", nomeBloco: "Bloco H" }
]

interface EstadoInicial {
    apiGaragens: Vacancy[],
    blocos: Bloco[],
    filtros: {
        blocoSelecionado: string,
    }
}

const estadoInicial: EstadoInicial = {
    apiGaragens: vacancyNumber, 
    blocos: nomeBloco,
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
    }
})


export const {filtroSetBloco} = garagemSlice.actions

export default garagemSlice.reducer
