import { entrarComGoogle } from "@/db/auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { AppDispatch } from "./store";

export const loginWithGoogleThunk = createAsyncThunk(
    'auth/loginWithGoogle', async () => {
        return await entrarComGoogle()
    }
)
export const logoutFireThunk = createAsyncThunk(
    'auth/logoutFire', async () => {
        const auth = getAuth()
        return await signOut(auth)
    }
)

interface IUserDados {
    uid: string
    email: string | null
    displayName: string | null
    photoURL: string | null
}

interface IAuth {
    user: IUserDados | null
    isLoading: boolean
}

const authInitial: IAuth = {
    user: null,
    isLoading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitial,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            if (action.payload){
                const dadosGoogle = action.payload
                state.user = {
                    uid: dadosGoogle.uid, 
                    email: dadosGoogle.email , 
                    displayName: dadosGoogle.displayName, 
                    photoURL: dadosGoogle.photoURL}
            } else {
                state.user = null
            }
                state.isLoading = false
            },

    },
    extraReducers: (builder) => {
        builder
        .addCase(logoutFireThunk.fulfilled, (state) => {
            state.user = null;
            state.isLoading = false;
        })
        // .addCase(loginWithGoogleThunk.fulfilled, (state, action: PayloadAction<User>) => {
        //     const dadosGoogle= action.payload
        //     state.user = dadosGoogle ? {
        //         uid: dadosGoogle.uid, 
        //         email: dadosGoogle.email , 
        //         displayName: dadosGoogle.displayName, 
        //         photoURL: dadosGoogle.photoURL} : null
        // })
    }
})
    
export const {setUser} = authSlice.actions
export default authSlice.reducer
    
    // Listener do estado global do Firebase (chamado uma vez no App)
export const listenToAuthChanges = () => (dispatch: AppDispatch) => {
    const auth = getAuth()
    onAuthStateChanged(auth, (userAtual) => {
        dispatch(setUser(userAtual));
    })
}