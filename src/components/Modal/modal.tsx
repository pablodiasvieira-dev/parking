import { BotaoReservarVaga } from "../Botoes/button";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "../ui/drawer";
import { FormReservar } from "./FormReserva";
import { Label } from "../ui/label";
import { forwardRef, useState } from "react";
import { EraserIcon } from "lucide-react";
import { TVagaOut } from "@/constrains/models";


interface IModalDownUp {
    isSelect: boolean;
    vagaLivreBloco?: number;
    vagasTotaisBloco?: number;
    vagaSelecionada?: TVagaOut | null;
    blocoSelecionado?: number;
    exibirVaga: boolean
    setExibirVaga: (value: boolean) => void
}

export const ModalDownUp = forwardRef<HTMLDivElement, IModalDownUp>(
    (
        { vagaLivreBloco, vagasTotaisBloco, isSelect, vagaSelecionada,
            blocoSelecionado, exibirVaga, setExibirVaga }: IModalDownUp, ref
    ) => {
        const [mostrarFormReserva, setMostrarFormReserva] = useState(false)

        const nomeVaga = `${vagaSelecionada?.number}-${vagaSelecionada?.bloco_id}`
        const configsButton = {
            unlock: { title: "Livre", bgColor: "bg-primary text-white", isBlocked: false },
            lock: { title: "Não disponível", bgColor: "#FF0000", isBlocked: true },
            reserved: { title: "Reservado", bgColor: "bg-gray-500 text-white", isBlocked: true },
            use: { title: "Em uso", bgColor: "bg-gray-500 text-white", isBlocked: true },
        }
        const configSelectButton = (vagaSelecionada && configsButton[vagaSelecionada.status]) ?? {
            title: "Reservar",
            bgColor: "bg-primary text-white",
            isBlocked: false
        }

        // const handleClickReservar = () => {
        //     setSelecionaReservar(!selecionaReservar)
        // }
        const handleClickBotaoAcao = () => {
            console.log(mostrarFormReserva)
            setExibirVaga(true)
            setMostrarFormReserva(true)
        }

        const BotaoDeAcao = (
            <BotaoReservarVaga
                configsSelectButton={configSelectButton}
                executaAcao={handleClickBotaoAcao} // Ação é apenas mudar o estado
            />
        )
        const BotaoDeSubmit = (
            <BotaoReservarVaga
                configsSelectButton={{ ...configSelectButton, title: 'Confirmar Reserva' }} // Pode mudar o texto se quiser
                type="submit" // Tipo é 'submit' para acionar o formulário
                classNameExt="h-10 rounded-2xl"
                executaAcao={() => setMostrarFormReserva(false)}
            />
        )

        const CardVagasLivresComBotao = (
            <div className="flex h-fit min-h-16 w-full rounded-t-2xl">
                <div className={`w-1/3 h-full  rounded-tl-2xl text-black font-light content-center ${isSelect && 'font-normal'}`}>
                    <span className={`font-semibold px-1.5 ${isSelect ? 'text-2xl' : 'text-4xl'}`} >{isSelect ? nomeVaga : vagaLivreBloco}</span>
                    {!isSelect && (<>/<span className="px-1.5">{vagasTotaisBloco}</span> </>)}
                    <p>{isSelect ? configSelectButton.title : "Vagas Livres"}</p>
                </div>
                <div className={`w-2/3 h-full rounded-tr-2xl rounded-bl-2xl overflow-hidden`}>
                    {BotaoDeAcao}
                </div>
            </div>
        )

        const FormSelecionaVagaEReserva = (
            <div className="w-full h-fit min-h-16 flex flex-col space-y-2 my-4 px-5">
                <Label className="pb-2 text-xl" >Dados da Reserva</Label>
                <div className="w-full h-fit flex flex-col">
                    <FormReservar blocoSelecionado={blocoSelecionado}>
                        {({ reset }) => (
                            <div className={`w-full h-fit gap-1 flex flex-col`}>
                                <Button variant="ghost" type="button"
                                    className="h-10 w-10 hover:text-orange-700"
                                    onClick={() => reset()}> <EraserIcon/>
                                </Button>
                                <div className="flex-grow">
                                    {BotaoDeSubmit}
                                </div>
                            </div>
                        )
                        }
                    </FormReservar>
                </div>
            </div>
        )

        const CanvaDadosDaVaga = (
            <div className="w-full h-fit min-h-16 flex flex-col space-y-2 rounded-t-2xl">
                <div className="flex h-fit min-h-16 w-full rounded-t-2xl">
                    <div className={`w-1/3 h-full  rounded-tl-2xl text-black font-light content-center ${isSelect && 'font-normal'}`}>
                        <span className={`font-semibold px-1.5 ${isSelect ? 'text-2xl' : 'text-4xl'}`} >{isSelect ? nomeVaga : vagaLivreBloco}</span>
                        {!isSelect && (<>/<span className="px-1.5">{vagasTotaisBloco}</span> </>)}
                        <p>{isSelect ? configSelectButton.title : "Vagas Livres"}</p>
                    </div>
                    <div className={`w-2/3 h-full rounded-tr-2xl rounded-bl-2xl overflow-hidden`}>
                        {BotaoDeAcao}
                    </div>
                </div>
                <Label className="pb-2 text-xl" >Informações</Label>
                <div className="w-full h-fit flex flex-col">
                    {vagaSelecionada?.number}
                </div>
            </div>
        )

        return (
            <div ref={ref} 
                className="w-full h-full  ">
                {(!exibirVaga && !isSelect) && CardVagasLivresComBotao}
                {(exibirVaga && isSelect) && CanvaDadosDaVaga}
                {(exibirVaga && !isSelect) && FormSelecionaVagaEReserva}
            </div>

        )
    })


export function ModalDrawer() {
    return (
        <div className="w-sm">
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <div className="p-4 pb-0">
                            <div className="flex items-center justify-center space-x-2">
                                TESTE
                            </div>
                            <div className="mt-3 h-[120px]">
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button>Submit</Button>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

        </div>
    )
}



