import { Button } from "@/components/ui/button";
import { setSubTitleNavigation, setTitleNavigation } from "@/redux/navigationSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";

interface IHome {
    user: any
}

export function Home({ user }: IHome) {
    if (!user) {
        return <Navigate to="/entrar" replace />;
    }
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setTitleNavigation("Home"))
        dispatch(setSubTitleNavigation("Bem-Vindo ao Parking"))
    }, [dispatch]
    )

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Button onClick={() => navigate("/app")}>Ver Vagas</Button>
        </div>
    )
}