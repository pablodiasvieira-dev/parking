import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSubTitleNavigation, setTitleNavigation } from "../../../redux/navigationSlice"
import { InputApp } from "../../../components/Form/Input"
import { Button } from "@/components/ui/button"

export function Login() {

  const dispatch = useDispatch()

  const [menuEntradaSelect, setMenuEntradaSelect] = useState<Number>(1)

  const handleClickMenu = (menuSelect: number) => {
    setMenuEntradaSelect(menuSelect)
  }

  useEffect(() => {
    dispatch(setTitleNavigation("Login"))
    dispatch(setSubTitleNavigation("Faça login para acessar o sistema"))
  }, []
  )


  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4">
      <div className="w-full h-18 flex justify-evenly gap-3">
        <button className="text-white font-medium cursor-pointer w-full h-full content-center" onClick={() => handleClickMenu(1)}>Login</button>
        <div className="text-white content-center">|</div>
        <button className="text-gray-200 font-light cursor-pointer w-full h-full content-center" onClick={() => handleClickMenu(2)}>Registrar</button>
      </div>
      <div className="w-full h-full flex flex-col gap-5">
        {menuEntradaSelect === 1 ? <FormLogin /> : <FormRegistrar />}
        <Button className="bg-amber-500 text-black text-xl h-10 cursor-pointer"  >Entrar</Button>
        <a className="text-white text-[.7rem] cursor-pointer w-full h-fit content-center" href="">Esqueci minha senha</a>
      </div>
    </div>
  )
}

export function FormLogin() {
  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <InputApp type="email" placeholder="E-mail" />
      <InputApp type="password" placeholder="Senha" />
    </div>
  )
}
export function FormRegistrar() {
  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <InputApp type="fullname" placeholder="Nome Completo" />
      <InputApp type="email" placeholder="E-mail" />
      <InputApp type="password" placeholder="Senha" />
      <InputApp type="password-repeat" placeholder="Repita a Senha" />
    </div>
  )
}