import { AppDispatch } from "@/redux/store"
import { supabase } from "./supabaseCliente"
import { setSupaSession, setUserSession } from "@/redux/authSupaSlice"

export const listenToAuthChangesSupa = () => (dispatch: AppDispatch) => {

    supabase.auth.getSession().then( ({data: {session}}) => {
        setSupaSession(session)
    })

    const {data: {subscription}} =  supabase.auth.onAuthStateChange(
        (_event, session) => {
            dispatch( setUserSession(session) )
            dispatch( setSupaSession(session) )
        }
    )
    return () =>  subscription.unsubscribe()
}