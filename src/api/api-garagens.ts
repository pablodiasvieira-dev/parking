import { supabase } from "@/db/supabase/supabaseCliente"

export const getGaragens = async () => {
    const {data, error} = await supabase.from('vagas').select()
    if(error) return []
    return data
}

export const getVagasDisponiveis = async () => {
    const {data, error} = await supabase.rpc(
        'get_vagas', {p_status: 'unlock'}
    )
    if(error) return []
    return data
}

