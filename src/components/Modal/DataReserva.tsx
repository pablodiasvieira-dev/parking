
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { differenceInDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { useState } from "react";
import { DateRange } from "react-day-picker";


interface DataSelecaoReservaProps {
    value: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
}

// interface IPeriodoDaReserva{
//     dataInicial: Date[]
// }

export function DataSelecaoReserva({ value, onChange }: DataSelecaoReservaProps) {

    const [isOpen, setIsOpen] = useState(false)

    const dataAtual = new Date()
    const dataFutura = new Date();
    dataFutura.setFullYear(dataAtual.getFullYear() + 1)

    const renderDataSelecionada = () => {
        if (value?.from) {
            if (value.to) {
                const dias = differenceInDays(value.to, value.from) + 1
                return (
                    <>
                        {format(value.from, "LLL dd, y", { locale: ptBR })} -{" "}
                        {format(value.to, "LLL dd, y", { locale: ptBR })}
                        <span className="ml-2 font-bold text-primary">({dias} {dias > 1 ? 'dias' : 'dia'})</span>
                    </>
                )
            }
            return format(value.from, "LLL dd, y", { locale: ptBR })
        }
        return <span>Selecione o período</span>;
    }

    const handleSelect = (range: DateRange | undefined) => {
        // Fecha o popover automaticamente quando um range completo for selecionado
        onChange(range)
        if (range?.from && range.to) {
            setIsOpen(false)
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full bg-transparent justify-start text-left font-normal hover:text-primary",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {renderDataSelecionada()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    locale={ptBR} mode="range" required excludeDisabled captionLayout="dropdown-months"
                    startMonth={new Date(dataAtual.getFullYear(), 0)} endMonth={new Date(dataFutura.getFullYear(), 0)}
                    defaultMonth={value?.from || new Date()}
                    max={365}
                    selected={value}
                    onSelect={handleSelect} // Conecta a seleção do calendário ao onChange do formulário
                    disabled={(date) =>
                        date < dataAtual || date >= dataFutura
                    }
                />
            </PopoverContent>
        </Popover>
    )
}