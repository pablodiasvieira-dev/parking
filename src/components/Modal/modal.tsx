import { BotaoReservarVaga } from "../Botoes/button";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "../ui/drawer";
import { FormReservar } from "./FormReserva";
import { Label } from "../ui/label";
import { forwardRef, useState } from "react";
import { EraserIcon } from "lucide-react";
import { TVagaOut } from "@/constrains/models";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import vagaImg from "../../assets/vaga/img07.jpeg"
import estacionamentoImg from "../../assets/vaga/img03.jpg"

type TStatisticBloco = {
    livres: number 
    em_uso: number 
    reservadas: number 
    bloqueadas?: number 
    totais: number
}

interface IModalDownUp {
    isSelect: boolean;
    statsVagasBloco?: TStatisticBloco
    vagaSelecionada?: TVagaOut | null;
    blocoSelecionado?: number;
    exibirVaga: boolean
    setExibirVaga: (value: boolean) => void
}

export const ModalDownUp = forwardRef<HTMLDivElement, IModalDownUp>(
    (
        {  isSelect, vagaSelecionada, statsVagasBloco,
            blocoSelecionado, exibirVaga, setExibirVaga }: IModalDownUp, ref
    ) => {
        const [mostrarFormReserva, setMostrarFormReserva] = useState(false)

        const isDesktop = useMediaQuery('(min-width: 768px)')

        const nomeVaga = `${vagaSelecionada?.number}-${vagaSelecionada?.bloco_id}`
        // TODO: pegar o nome complto da vaga para nao parecer o id
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
            isDesktop ? (
                <div className="flex flex-col h-fit min-h-16 w-full rounded-t-2xl md:flex-col md:justify-center md:gap-3 md:items-center md:px-8 md:py-4">
                    <div className="w-full flex">
                        <Badge variant="default" className="text-gray-800 dark:text-white">Estacionamento</Badge>
                    </div>
                    <img src={estacionamentoImg} alt="visualizacao da vaga" className="h-52 w-full object-cover rounded-lg shadow-sm dark:shadow-gray-800 filter grayscale" />
                    <div className="w-full flex justify-between">
                        <div className="w-4/5 flex flex-col items-start">
                            <h1 className="text-xl text-gray-700 dark:text-foreground font-semibold">Condomínio Residencial Golden</h1>
                            <h2 className="text-sm text-gray-700 font-semibold dark:text-foreground">Rua Pirapitinga, 7716</h2>
                        </div>
                        <div className="w-1/5 dark:text-white text-gray-900">⭐5.0</div>
                    </div>
                    <div className="w-full flex flex-wrap gap-4 justify-evenly">
                        <Card className="w-36 h-20 p-1 bg-primary/80 text-black border-none">
                            <CardHeader>
                                <CardDescription className="text-black text-[.7rem] font-medium">Vagas Livres</CardDescription>
                                <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">{statsVagasBloco?.livres}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="w-36 h-20 p-1 bg-primary/60 text-black border-none">
                            <CardHeader>
                                <CardDescription className="text-black text-[.7rem] font-medium">Em Uso</CardDescription>
                                <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">{statsVagasBloco?.em_uso}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="w-36 h-20 p-1 bg-rose-400 text-black border-none">
                            <CardHeader>
                                <CardDescription className="text-black text-[.7rem] font-medium">Reservadas</CardDescription>
                                <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">{statsVagasBloco?.reservadas}</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="w-36 h-20 p-1 bg-background dark:text-white text-black border-none">
                            <CardHeader>
                                <CardDescription className="dark:text-white text-black text-[.7rem] font-medium">Total de Vagas</CardDescription>
                                <CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">{statsVagasBloco?.totais}</CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className={`w-2/3 md:w-full h-full rounded-tr-2xl md:rounded-full rounded-bl-2xl overflow-hidden`}>
                        {BotaoDeAcao}
                    </div>
                </div>
            ) : (
                <div className="flex h-fit min-h-16 w-full rounded-t-2xl md:flex-col md:justify-center md:gap-3">
                    <div className={`w-1/3 md:w-full h-full  rounded-tl-2xl text-black md:dark:text-white font-light content-center ${isSelect && 'font-normal'}`}>
                        <span className={`font-semibold px-1.5 ${isSelect ? 'text-2xl' : 'text-4xl'}`} >{isSelect ? nomeVaga : statsVagasBloco?.livres}</span>
                        {!isSelect && (<>/<span className="px-1.5">{statsVagasBloco?.totais}</span> </>)}
                        <p>{isSelect ? configSelectButton.title : "Vagas Livres"}</p>
                    </div>
                    <div className={`w-2/3 md:w-full h-full rounded-tr-2xl md:rounded-full rounded-bl-2xl overflow-hidden`}>
                        {BotaoDeAcao}
                    </div>
                </div>
            )
        )

        const FormSelecionaVagaEReserva = (
            <div className="w-full h-fit min-h-16 flex flex-col space-y-2 my-4 px-5 md:dark:text-white">
                <Label className="pb-2 text-xl" >Dados da Reserva</Label>
                <div className="w-full h-fit flex flex-col">
                    <FormReservar blocoSelecionado={blocoSelecionado}>
                        {({ reset }) => (
                            <div className={`w-full h-fit gap-1 flex flex-col`}>
                                <Button variant="ghost" type="button"
                                    className="h-10 w-10 hover:text-orange-700"
                                    onClick={() => reset()}> <EraserIcon />
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
            <div className="w-full h-fit min-h-16 flex flex-col space-y-2 rounded-t-2xl bg-inherit md:dark:text-white ">
                <div className="w-full h-full flex flex-col gap-2 justify-center items-center md:px-8 md:py-4">
                    {
                        isDesktop ? (
                            <>
                                <div className="w-full flex">
                                    <Badge variant="default" className="text-gray-800 dark:text-white">{configSelectButton.title}</Badge>
                                </div>
                                <img src={vagaImg} alt="visualizacao da vaga" className="h-52 w-full object-cover rounded-lg shadow-sm dark:shadow-gray-800 filter grayscale" />
                                <div className="w-full flex justify-between">
                                    <div className="w-4/5 flex flex-col items-start">
                                        <p className="text-xl text-gray-700 dark:text-foreground">Vaga: <span className="text-primary font-bold">{nomeVaga}</span></p>
                                        <h2 className="text-sm text-gray-700 font-semibold dark:text-foreground">Dimensões:
                                            <span className="text-gray-900 font-normal dark:text-white"> 2m x 6m (L x P)</span></h2>
                                    </div>
                                    <div className="w-1/5">⭐5.0</div>
                                </div>
                                <div className="w-full flex gap-2">
                                    <Badge variant="outline" className="text-gray-800 dark:text-white">Acessível</Badge>
                                    <Badge variant="outline" className="text-gray-800 dark:text-white">Coberta</Badge>
                                    <Badge variant="outline" className="text-gray-800 dark:text-white">Ponto de Carga</Badge>
                                </div>
                                <div className={`w-full h-full rounded-full overflow-hidden`}>
                                    {BotaoDeAcao}
                                </div>
                            </>
                        ) : (
                            <div className="flex h-fit min-h-16 w-full rounded-t-2xl">
                                <div className={`w-1/3 h-full  rounded-tl-2xl text-black font-light content-center ${isSelect && 'font-normal'}`}>
                                    <span className={`font-semibold px-1.5 ${isSelect ? 'text-2xl' : 'text-4xl'}`} >{isSelect ? nomeVaga : statsVagasBloco?.livres}</span>
                                    {!isSelect && (<>/<span className="px-1.5">{statsVagasBloco?.totais}</span> </>)}
                                    <p>{isSelect ? configSelectButton.title : "Vagas Livres"}</p>
                                </div>
                                <div className={`w-2/3 h-full rounded-tr-2xl rounded-bl-2xl overflow-hidden`}>
                                    {BotaoDeAcao}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )

        return (
            <div ref={ref}
                className="w-full h-full md:p-2 ">
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



