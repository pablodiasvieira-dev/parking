import { CircleUser, House, SquareParking } from "lucide-react";

export function MenuNavegacao(){
    return (
        <nav className="navegacao flex h-24 w-full z-50 justify-evenly px-8 py-2 bg-white">
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                <House className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                <SquareParking className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer">
                <CircleUser className="text-gray-500 hover:text-white w-full h-full p-4" />
            </div>
        </nav>
    )
}