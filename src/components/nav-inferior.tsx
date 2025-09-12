import { 
    // CircleUser, 
    House, SquareParking } from "lucide-react";
import { Button } from "./ui/button";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logoutFireThunk } from "@/redux/authSlice";


export function MenuNavegacao() {
    const dispatch: AppDispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutFireThunk())
    }

    return (
        <nav className="navegacao flex h-24 w-full z-50 justify-evenly px-8 py-2 bg-white">
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                <House className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                <SquareParking className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                {/* <CircleUser className="text-gray-500 hover:text-white w-full h-full p-4" /> */}
                <Button variant="outline" className=" text-black text-md h-10 cursor-pointer dark:text-primary font-light w-fit"
                    onClick={handleLogout} >
                    Sair
                </Button>
            </div>
        </nav>
    )
}