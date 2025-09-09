import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setSubTitleNavigation, setTitleNavigation } from "../../redux/navigationSlice"
import { Input } from "../../components/Form/Input"

export function Login() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitleNavigation("Login"))
    dispatch(setSubTitleNavigation("Faça login para acessar o sistema"))
  }, []
  )

  return (
    <div>
      <Input label="E-mail" type="email" placeholder="Digite seu e-mail"/>
      <Input label="Senha" type="password" placeholder="Digite sua senha" />
    </div>
  )
}
