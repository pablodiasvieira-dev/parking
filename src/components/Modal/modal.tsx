import { BotaoTipoInicial } from "../Botoes/button";

export function ModalDownUp() {
    return (
        <>
            <div className="modal relative bottom-0 left-0 z-40 flex flex-col w-full h-20 bg-white gap-1 rounded-t-2xl shadow-[0px_-10px_10px_-1px_rgba(0,_0,_0,_0.45)]">
                <div className="flex h-full w-full 0 rounded-t-2xl">
                    <div className="w-1/3 h-full  rounded-tl-2xl text-black font-light text-xl content-center">
                        <span className="text-4xl font-semibold px-1.5" >8</span>/<span className="px-1.5">16</span>
                        <p className="font-normal">Livre</p>
                    </div>
                    <BotaoTipoInicial name="Reservar" />
                </div>

            </div>
        </>
    )
}