import { supabase } from "./supabaseCliente"

// Funcoes de Entrar no sistema
export const loginUserWithEmail = async (email: string, password: string) => {
    const emailCorrigido = email.trim().toLowerCase()
    const { data, error } = await supabase.auth.signInWithPassword({
        email: emailCorrigido,
        password: password
    })
    if (error) {
        console.error("Erro no login: ", error.message);
    }
    return { data, error };
}

export const entrarComGoogleSupa = async (): Promise<void> => {
    const {data, error} = await supabase.auth
        .signInWithOAuth( {provider: "google"})
    if(error) {
        console.error("Erro ao logar com Google: ", error.message)
        throw error
    }
    if (data.url){
        window.location.href = data.url
    }
}

// Funcao de deslogar/sair do sistema
export const deslogarSupa = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Erro ao fazer logout: ", error.message);
    }
    
    return { error };
}


// Funções de criar conta
export const createUserWithEmail = async (nome: string, email: string, password: string) => {
    const emailCorrigido = email.trim().toLowerCase()

    const { data, error } = await supabase.auth.signUp({
        email: emailCorrigido,
        password: password,
        options: {
            data: {
                full_name: nome,
            }
        }
    })
    if (error) {
        console.error("Erro ao criar usuário: ", error.message);
    }

    return { data, error };

}

