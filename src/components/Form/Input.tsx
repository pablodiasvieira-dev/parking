import { Input } from "../ui/input"

interface IInput {
    type: string
    placeholder: string
}

export function InputApp({ type, placeholder}: IInput) {
  return (
    <div className="w-full h-10">
        <Input className="h-full text-primary-foreground " type={type} placeholder={placeholder} />
    </div>
  )
}
