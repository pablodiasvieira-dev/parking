import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: ReactNode
}

export function PrivateRoute({ children }: IPrivateRoute) {
    const user  = useSelector((state: RootState) => state.auth.user)

    if (!user) {
        return <Navigate to="/entrar" replace />;
    }

    return children;
}