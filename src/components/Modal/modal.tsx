import { TVagaOut } from "@/api/api";
import { BotaoReservarVaga } from "../Botoes/button";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "../ui/drawer";

interface IModalDownUp {
    isSelect: boolean;
    vagasTotaisBloco?: number;
    vagaLivreBloco?: number;
    vagaSelecionada?: TVagaOut | null;
}

export function ModalDownUp({ vagaLivreBloco, vagasTotaisBloco, isSelect, vagaSelecionada }: IModalDownUp) {

    const nomeVaga = `${vagaSelecionada?.number}-${vagaSelecionada?.bloco}`
    const configsButton = {
        unlock: { title: "Livre", bgColor: "bg-primary text-white", isBlocked: false },
        lock: { title: "Não disponível", bgColor: "#FF0000", isBlocked: true },
        reserved: { title: "Reservado", bgColor: "bg-gray-500 text-white", isBlocked: true },
        use: { title: "Em uso", bgColor: "bg-gray-500 text-white", isBlocked: true },
    }
    const configSelectButton = configsButton[vagaSelecionada?.status!] ?? {
        title: "Reservar",
        bgColor: "bg-primary text-white",
        isBlocked: false
    }

    return (
        <>
            <div className="modal relative bottom-0 left-0 z-40 flex flex-col w-full h-20 bg-white gap-1 rounded-t-2xl shadow-[0px_-10px_10px_-1px_rgba(0,_0,_0,_0.45)]">
                <div className="flex h-full w-full 0 rounded-t-2xl">
                    <div className={`w-1/3 h-full  rounded-tl-2xl text-black font-light content-center ${isSelect && 'font-normal'}}`}>
                        <span className={`font-semibold px-1.5 ${isSelect ? 'text-2xl' : 'text-4xl'}`} >{isSelect ? nomeVaga : vagaLivreBloco}</span>
                        {!isSelect && (
                            <>
                                /<span className="px-1.5">{vagasTotaisBloco}</span>
                            </>
                        )}
                        <p>{isSelect ? configSelectButton.title : "Vagas Livres"}</p>
                    </div>
                    <div
                        className={`w-2/3 h-full rounded-tr-2xl rounded-bl-2xl overflow-hidden`}>
                        <BotaoReservarVaga configsSelectButton={configSelectButton} />
                    </div>
                </div>

            </div>
        </>
    )
}


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