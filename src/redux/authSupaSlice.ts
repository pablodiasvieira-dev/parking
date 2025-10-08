import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Session } from '@supabase/supabase-js'
import { createUserWithEmail, deslogarSupa, entrarComGoogleSupa, loginUserWithEmail } from "@/db/supabase/authSupa";

export const loginGoogleSupaThunk = createAsyncThunk(
    'authSupa/loginGoogleSupaThunk', async () => {
        await entrarComGoogleSupa()
    }
)

export const loginEmailThunk = createAsyncThunk(
    'auth/loginEmailThunk', async ({email, password}: {email: string, password: string}) => {
        return await loginUserWithEmail(email, password)
    }
)

export const createUserEmailSupaThunk = createAsyncThunk(
    'auth/createUserEmailSupaThunk', async ({nome, email, password}: {nome:string, email: string, password: string} ) => {
        return await createUserWithEmail(nome, email, password)
    }
)

export const logoutSupaThunk = createAsyncThunk(
    'auth/logoutSupaThunk', async () => {
        return await deslogarSupa()
    }
)

interface IUserDados {
    id: string
    email?: string | null
    displayName: string | null
    photoURL: string | null
}

interface IAuth {
    user: IUserDados | null
    isLoading: boolean
    session?: any
}

const authInitial: IAuth = {
    user: null,
    isLoading: true
}

export const authSupaSlice = createSlice({
    name: 'authSupa',
    initialState: authInitial,
    reducers: {
        setSupaUser: (state, action: PayloadAction<Session | null>) => {
            if (action.payload){
                const dadosGoogle = action.payload.user
                state.user = {
                    id: dadosGoogle.id, 
                    email: dadosGoogle.email, 
                    displayName: dadosGoogle.user_metadata?.full_name, 
                    photoURL: dadosGoogle.user_metadata?.avatar_url
                }
            } else {
                state.user = null
            }
                state.isLoading = false
        },
        setUserSession: (state, action: PayloadAction<Session | null>) => {
            if (action.payload) {
                const user = action.payload.user;
                state.user = {
                    id: user.id,
                    email: user.email,
                    displayName: user.user_metadata?.full_name,
                    photoURL: user.user_metadata?.avatar_url,
                };
            } else {
                state.user = null;
            }
            state.isLoading = false;
        },
        setSupaSession: (state, action) => {
            state.session = action.payload
        }

    },
})
    
export const {setSupaUser, setUserSession, setSupaSession} = authSupaSlice.actions
export default authSupaSlice.reducer