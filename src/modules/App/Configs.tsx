import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { logoutFireThunk } from "@/redux/authSlice";
import { setNavigation } from "@/redux/navigationSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

interface IConfigs {
    user: any
}

export function Configs({ user }: IConfigs) {
    if (!user) {
        return <Navigate to="/entrar" replace />;
    }

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(setNavigation({ id: 4, title: "Preferências", subtitle: "Dados pessoais e da aplicação" }))
    }, [dispatch]
    )

    const photoUser = useSelector((state: RootState) => state.auth.user?.photoURL)

    const handleLogout = () => {
        dispatch(logoutFireThunk())
    }
    return (
        <>
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-16 h-16 align-middle bg-white rounded-full hover:bg-amber-600 cursor-pointer flex justify-center items-center">
                        {/* <CircleUser className="text-gray-500 hover:text-white w-full h-full p-4" /> */}
                        <Avatar onClick={handleLogout}>
                            <AvatarImage src={photoUser || "https://github.com/evilrabbit.png"} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Tema do App</CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeToggle />
                </CardContent>
            </Card>
        </div>
        </>
    )
}