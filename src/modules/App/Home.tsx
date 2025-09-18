import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setNavigation } from "@/redux/navigationSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

interface IHome {
    user: any
}

export function Home({ user }: IHome) {
    if (!user) {
        return <Navigate to="/entrar" replace />;
    }
    const listagemTotalVagas = useSelector((state: RootState) => state.garagens.apiGaragens)

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setNavigation({ id: 2, title: "Home", subtitle: "Bem-Vindo ao Parking" }))
    }, [dispatch,])

    return (
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Vagas Livres</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{listagemTotalVagas.filter(item => item.status === "unlock").length}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => navigate("/app")}>Ver Vagas</Button>
                </CardFooter>
            </Card>
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Vagas de Garagem</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-2xl">{listagemTotalVagas.length}</p>
                </CardContent>
            </Card>
        </div>
    )
}