import { TVagaOut } from "@/api/api";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { DataSelecaoReserva } from "./DataReserva";
import { SelectVaga } from "./SelectVagaReserva";


interface IFormReservarProps {
    listaVagasBloco: TVagaOut[];
    blocoSelecionado?: string;
    children: (helpers: { reset: () => void }) => React.ReactNode
}

export function FormReservar({ listaVagasBloco, blocoSelecionado, children }: IFormReservarProps) {
    const formSchema = z.object({
        codigoVaga: z.string({
            // required_error: "Por favor selecione uma vaga para reservar",
        }),
        periodo: z.object({
            from: z.date(),
            to: z.date()
        })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            codigoVaga: "",
            periodo: undefined
        }
    })
    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("Dados da submissao", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                <FormField
                    control={form.control}
                    name="codigoVaga"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vaga</FormLabel>
                            <SelectVaga
                                value={field.value}
                                onChange={field.onChange}
                                listaVagasBloco={listaVagasBloco}
                                blocoSelecionado={blocoSelecionado} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="periodo"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Data da Reserva</FormLabel>
                            <DataSelecaoReserva 
                                value={field.value}
                                onChange={field.onChange}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {children({ reset: form.reset })}
            </form>
        </Form>
    )
}