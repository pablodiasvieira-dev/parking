import { BoltIcon } from "lucide-react";
import { ModeToggle } from "../Botoes/mode-toggle";
import { MenuNavegacaoDesktop } from "../NavBar";
import { Button } from "../ui/button";
import { LogoApp, LogoAppEsquerdo, LogoAppWelcome, LogoEntrada } from "./Logo";
import { Link } from "react-router";
import { ProfileToggle } from "../Botoes/profile-toogle";

interface IHeader {
    title: string;
    subtitle: string;
}

export function Header(
    { title, subtitle }: IHeader
) {
    return (
        <div className='flex sticky top-0 right-0 w-full h-full bg-primary shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]' >
            <div className="w-2/3 h-full flex flex-col gap-0 justify-center align-middle pl-8">
                <h1 className='font-bold w-full h-fit text-2xl text-black text-start'>
                    {title}
                </h1>
                <p className='w-full h-full text-start text-secondary font-light text-sm'>{subtitle}</p>
            </div>
            <div className="w-1/3 h-full flex flex-col justify-start items-end">
                <LogoApp />
            </div>
        </div>
    )
}
export function HeaderDesktop() {
    return (
        <div className='flex items-center sticky top-0 right-0 w-full h-full bg-transparent shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]' >
            <div className="w-1/3 h-full flex gap-2 justify-between items-center pl-0">
                <LogoAppEsquerdo />
                <h1 className='font-bold w-full h-fit text-2xl text-white dark:text-primary text-start'>
                    Parking App
                </h1>
            </div>
            <MenuNavegacaoDesktop />
            <div className="w-1/3 h-full flex justify-end pr-2 items-center gap-2">
                <ModeToggle />
                <Link to='/config'>
                    <Button variant="ghost" className="w-9 h-9 hover:cursor-pointer bg-secondary dark:text-white text-primary rounded-full ">
                        <BoltIcon className="w-full h-full m-0 p-0" />
                    </Button>
                </Link>
                    <ProfileToggle/>
            </div>
        </div>
    )
}

export function HeaderApp() {
    return (
        <div className='flex flex-col justify-between w-full h-full' >
            <div className="w-full h-3/5 flex flex-col gap-0 justify-center">
                <h2 className='font-light w-full text-4xl text-black text-start'>
                    Bem-vindo ao
                </h2>
                <h1 className='font-bold w-full text-5xl text-black text-start'>
                    Parking App
                </h1>
            </div>
            <LogoAppWelcome />
        </div>
    )
}

export function HeaderEntrada() {
    return (
        <div className='flex justify-between w-full h-full pl-8' >
            <div className="w-2/3 h-full flex flex-col gap-0 justify-center align-middle">
                <h1 className='font-bold w-full h-fit text-3xl text-black text-start'>
                    Parking
                </h1>
            </div>
            <div className="w-1/3 h-full flex  flex-col justify-start items-end ">
                <LogoEntrada />
            </div>
        </div>
    )
}




