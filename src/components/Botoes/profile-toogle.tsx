import { UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { logoutSupaThunk } from "@/redux/authSupaSlice"


export function ProfileToggle() {
    
    const dispatch: AppDispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutSupaThunk())
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-9 h-9 hover:cursor-pointer bg-secondary dark:text-white text-primary  rounded-full ">
                    <UserIcon className="w-full h-full m-0 p-0" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Meus Dados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}