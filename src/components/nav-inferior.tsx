import {
    House, SquareParking,
    User2Icon
} from "lucide-react";
import { useNavigate } from "react-router";

export function MenuNavegacao() {
    const navigate = useNavigate();

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
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer"  onClick={handleClickHome} >
                <House className="text-gray-500 hover:text-white w-full h-full p-4"/>
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer"  onClick={handleClickApp} >
                <SquareParking className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer"  onClick={handleClickConfig} >
                <User2Icon className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
        </nav>
    )
}