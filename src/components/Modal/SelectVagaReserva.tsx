import { TVagaOut } from "@/api/api";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useMemo } from "react";

interface ISelectVaga {
    listaVagasBloco: TVagaOut[]
    blocoSelecionado?: string
    value: string
    onChange: (value: string) => void
}
export function SelectVaga({ listaVagasBloco, blocoSelecionado, value, onChange }: ISelectVaga) {

    const vagasAgrupadas = useMemo(() => {
        const disponiveis = listaVagasBloco?.filter(item => item.status === "unlock") ?? [];
        return disponiveis.reduce((acc, vaga) => {
            if (!acc[vaga.bloco || 0]) {
                acc[vaga.bloco || 0] = [];
            }
            acc[vaga.bloco || 0].push(vaga);
            return acc;
        }, {} as Record<string, TVagaOut[]>);
    }, [listaVagasBloco]);

    const blocos = useMemo(() => {
        return blocoSelecionado ? [blocoSelecionado] : Object.keys(vagasAgrupadas);
    }, [blocoSelecionado, vagasAgrupadas])

    // const blocos = blocoSelecionado ? [blocoSelecionado] : [... new Set(listaVagasBloco?.map(item => item.bloco))]
    // const vagasDisponiveis = listaVagasBloco?.filter(item => item.status === "unlock")
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-full fill-background">
                <SelectValue placeholder="Selecione uma vaga" />
            </SelectTrigger>
            <SelectContent>
                {
                    blocos.map(
                        (bloco: string) => (
                            <SelectGroup key={bloco}>
                                <SelectLabel>Bloco {bloco}</SelectLabel>
                                {(vagasAgrupadas[bloco] || [])
                                    .map((vaga) => (
                                        <SelectItem key={vaga.id} value={vaga.id}>{
                                            `${vaga.number}-${vaga.bloco}`
                                        }</SelectItem>
                                    )
                                    )
                                }
                            </SelectGroup>
                        )
                    )
                }
            </SelectContent>
        </Select>
    )
}