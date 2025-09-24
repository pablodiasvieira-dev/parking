import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setNavigation } from "@/redux/navigationSlice";
import { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";

interface IReservas {
    user: any
}

export function Reservas({ user }: IReservas) {
    if (!user) {
        return <Navigate to="/entrar" replace />;
    }

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(setNavigation({ id: 4, title: "Reservas", subtitle: "Reservas já solicitadas" }))
    }, [dispatch]
    )

    return (
        <>
        <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <Card className="w-2/3">
                <CardHeader>
                    <CardTitle>Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                    <h1>Reservas</h1>
                </CardContent>
            </Card>
        </div>
        </>
    )
}