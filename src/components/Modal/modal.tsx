import { BotaoTipoInicial } from "../Botoes/button";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "../ui/drawer";

interface IModalDownUp {
    isSelect: boolean;
    vagasTotaisBloco?: number;
    vagaLivreBloco?: number;
    vagaSelecionada?: string;
}

export function ModalDownUp({vagaLivreBloco, vagasTotaisBloco, isSelect, vagaSelecionada}: IModalDownUp) {
    return (
        <>
            <div className="modal relative bottom-0 left-0 z-40 flex flex-col w-full h-20 bg-white gap-1 rounded-t-2xl shadow-[0px_-10px_10px_-1px_rgba(0,_0,_0,_0.45)]">
                <div className="flex h-full w-full 0 rounded-t-2xl">
                    <div className={`w-1/3 h-full  rounded-tl-2xl text-black font-light text-xl content-center ${isSelect && 'font-normal text-[.3rem]'}}`}>
                        <span className="text-4xl font-semibold px-1.5" >{isSelect ? vagaSelecionada : vagaLivreBloco}</span>
                            {!isSelect && (
                                <>
                                    /<span className="px-1.5">{vagasTotaisBloco}</span>
                                </>
                            )}
                        <p>{isSelect ? "Selecionada" : "Livre"}</p>
                    </div>
                    <BotaoTipoInicial name={isSelect ? "Reservar" : "Selecionar"} />
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