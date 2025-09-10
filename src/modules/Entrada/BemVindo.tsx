import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function BemVindo() {
    return (
        <div>
            <Link to="/entrar">
                <Button variant="default" className="w-full h-12 text-gray-900 text-xl font-bold cursor-pointer">Vamos lá</Button>
            </Link>
        </div>
    )
}
