import { RootState } from "@/redux/store";
import {
    House, SquareParking,
    User2Icon
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
                    ${menuSelecionado === 2 ? 'bg-gray-900 dark:bg-background': 'bg-inherit' }
                    `}  
                    onClick={handleClickHome} >
                <House className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 2 ? 'text-white' : 'text-gray-900 dark:text-secondary' }`}/>
            </div>
            <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
                    hover:bg-amber-600 
                    ${menuSelecionado === 3 ? 'bg-gray-900 dark:bg-background': 'bg-inherit' }
                    `}  
                    onClick={handleClickApp} >
                <SquareParking className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 3 ? 'text-white' : 'text-gray-900 dark:text-secondary' } hover:text-white w-full h-full p-4`} />
            </div>
            <div className={`w-16 h-16 align-middle rounded-full cursor-pointer
                    hover:bg-amber-600 
                    ${menuSelecionado === 4 ? 'bg-gray-900 dark:bg-background': 'bg-inherit' }
                    `}  
                    onClick={handleClickConfig} >
                <User2Icon className={`hover:text-white w-full h-full p-4 ${menuSelecionado === 4 ? 'text-white' : 'text-gray-900 dark:text-secondary' } hover:text-white w-full h-full p-4`} />
            </div>
        </nav>
    )
}