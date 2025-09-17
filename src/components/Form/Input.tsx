import { Input } from "../ui/input"

interface IInput {
    type: string
    placeholder: string
    valor: string
    setValor: (valor: string) => void
}

export function InputApp({ type, placeholder, valor, setValor}: IInput) {
  return (
    <div className="w-full h-10">
        <Input className="h-full text-primary-foreground " type={type} placeholder={placeholder}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
    </div>
  )
}
