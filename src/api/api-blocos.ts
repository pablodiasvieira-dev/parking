import { supabase } from "@/db/supabase/supabaseCliente"

export const getBlocos = async () => {
    const {data, error} = await supabase.from('blocos').select()
    if(error) return []
    return data
}