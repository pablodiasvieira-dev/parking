import { supabase } from "./supabaseCliente"

export const entrarComGoogleSupa = async (): Promise<void> => {
    const {data, error} = await supabase.auth
        .signInWithOAuth( {provider: "google"})
    if(error) {
        console.error("Erro ao logar com Google: ", error.message)
        return
    }
    if (data.url){
        window.location.href = data.url
    }
}