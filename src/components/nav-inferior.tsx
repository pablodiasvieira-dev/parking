import { 
    // CircleUser, 
    House, SquareParking } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutFireThunk } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";


export function MenuNavegacao() {
    const dispatch: AppDispatch = useDispatch()
    const photoUser = useSelector((state: RootState) => state.auth.user?.photoURL)

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
            <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer flex justify-center items-center">
                {/* <CircleUser className="text-gray-500 hover:text-white w-full h-full p-4" /> */}
                <Avatar onClick={handleLogout}>
                    <AvatarImage src={photoUser || "https://github.com/evilrabbit.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="w-16 h-16 flex justify-center items-center">
                <ModeToggle />
            </div>
        </nav>
    )
}