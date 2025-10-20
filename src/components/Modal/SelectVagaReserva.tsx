import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ISelectVaga {
    blocoSelecionado?: number
    value: number
    onChange: (value: string) => void
}
export function SelectVaga({ blocoSelecionado, value, onChange }: ISelectVaga) {
    const vagasDisponiveisState = useSelector( (state: RootState) => state.garagens.vagasDisponiveis)
    const blocosState = useSelector( (state: RootState) => state.garagens.blocos)

    return (
        <Select onValueChange={onChange} defaultValue={value.toString()}>
            <SelectTrigger className="w-full fill-background">
                <SelectValue placeholder="Selecione uma vaga" />
            </SelectTrigger>
            <SelectContent>
                {
                    blocosState
                    .filter(bloco => bloco.id === blocoSelecionado)
                    .map(
                        (bloco) => (
                            <SelectGroup key={bloco.id}>
                                <SelectLabel>{bloco.nome_bloco}</SelectLabel>
                                {vagasDisponiveisState
                                    .filter( blocoComVagas => blocoComVagas.bloco_id == bloco.id )
                                    .map((vagasDoBloc) => (
                                        vagasDoBloc.vagas.map((vaga) => (
                                            <SelectItem key={vaga.id} value={vaga.id.toString()}>{
                                            `${vaga.number}-${vagasDoBloc.sigla_bloco}`
                                        }</SelectItem>
                                        ))
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