

export interface IBloco {
    id: number
    sigla_bloco: string
    nome_bloco: string
}
export type TBloco = {
    id: number
    sigla_bloco: string
    nome_bloco: string
}


export type TStatusGaragem = "lock" | "unlock" | "use" | "reserved"

export type TGaragens = {
    id: number
    number: string
    is_right: boolean
    status: TStatusGaragem
    bloco_id: number
    ordem_no_bloco: string
}

export type TVagaOut = Omit<TGaragens, "is_right" | "ordem_no_bloco">
export type TVaga = Omit<TGaragens, "bloco_id">

export type TVagasFiltradas = {
    bloco_id: number
    sigla_bloco: string
    nome_bloco: string
    vagas: TVaga[]
}
