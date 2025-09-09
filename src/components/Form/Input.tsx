interface IInput {
    label: string
    type: string
    placeholder: string
}

export function Input({label, type, placeholder}: IInput) {
  return (
    <div>
        <label htmlFor="login">{label}</label>
        <input id="login" type={type} placeholder={placeholder} />
    </div>
  )
}
