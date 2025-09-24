import { RootState } from "@/redux/store";
import {
    House, SquareParking,
    User2Icon
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "./ui/menubar";

export function MenuNavegacao() {

    const navigate = useNavigate();
    const menuSelecionado = useSelector((state: RootState) => state.navegar.id);

    const handleClickHome = () => {
        navigate("/home");
    };

    const handleClickApp = () => {
        navigate("/app");
    };
    const handleClickConfig = () => {
        navigate("/config");
    };

    return (
        <nav className="navegacao flex h-24 w-full z-50 justify-evenly px-8 py-2 bg-white">
            <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
                    hover:bg-amber-600 
                    ${menuSelecionado === 2 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
                    `}
                onClick={handleClickHome} >
                <House className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 2 ? 'text-white' : 'text-gray-900 dark:text-secondary'}`} />
            </div>
            <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
                    hover:bg-amber-600 
                    ${menuSelecionado === 3 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
                    `}
                onClick={handleClickApp} >
                <SquareParking className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 3 ? 'text-white' : 'text-gray-900 dark:text-secondary'} hover:text-white w-full h-full p-4`} />
            </div>
            <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
                    hover:bg-amber-600 
                    ${menuSelecionado === 4 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
                    `}
                onClick={handleClickConfig} >
                <User2Icon className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 4 ? 'text-white' : 'text-gray-900 dark:text-secondary'} hover:text-white w-full h-full p-4`} />
            </div>
        </nav>
    )
}
export function MenuNavegacaoDesktop() {

    const menuSelecionado = useSelector((state: RootState) => state.navegar.id);

    const links = [
        { id: 2, to: "/home", label: "Dashboard" },
        { id: 3, to: "/app", label: "Garagens" },
        { id: 4, to: "/reservas", label: "Reservas" },
        { id: 5, to: "/config", label: "Conta" },
    ]

    return (
        <nav className="navegacao flex h-fit w-full justify-center align-middle">
            <Menubar className="h-full flex my-0 border border-white dark:border-primary dark:bg-primary/10 bg-foreground  gap-2 rounded-lg">
                <MenubarMenu>
                    {links.map((link) => (
                        <MenubarTrigger key={link.id} className="p-0 ">
                            <Link
                                to={link.to}
                                className={`rounded-md transition-colors h-fit w-full min-w-24 px-4 py-2 dark:text-white text-black
                                        ${menuSelecionado === link.id
                                        ? "bg-primary text-background"
                                        : "hover:bg-background hover:text-background-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </MenubarTrigger>
                    ))}
                </MenubarMenu>
            </Menubar>
        </nav>
    )
}

// <nav className="navegacao flex h-24 w-full z-50 justify-evenly px-8 py-2 bg-white">
//     <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
//                     hover:bg-amber-600
//                     ${menuSelecionado === 2 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
//                     `}
//         onClick={handleClickHome} >
//         <House className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 2 ? 'text-white' : 'text-gray-900 dark:text-secondary'}`} />
//     </div>
//     <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
//                     hover:bg-amber-600
//                     ${menuSelecionado === 3 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
//                     `}
//         onClick={handleClickApp} >
//         <SquareParking className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 3 ? 'text-white' : 'text-gray-900 dark:text-secondary'} hover:text-white w-full h-full p-4`} />
//     </div>
//     <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
//                     hover:bg-amber-600
//                     ${menuSelecionado === 4 ? 'bg-gray-900 dark:bg-background' : 'bg-inherit'}
//                     `}
//         onClick={handleClickConfig} >
//         <User2Icon className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 4 ? 'text-white' : 'text-gray-900 dark:text-secondary'} hover:text-white w-full h-full p-4`} />
//     </div>
// </nav>