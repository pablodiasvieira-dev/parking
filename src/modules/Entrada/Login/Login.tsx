import { useState } from "react"
import { useDispatch } from "react-redux"
import { InputApp } from "../../../components/Form/Input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { loginWithGoogleThunk } from "@/redux/authSlice"
import { AppDispatch } from "@/redux/store"


export function Login() {

  const dispatch: AppDispatch = useDispatch()

  const [menuEntradaSelect, setMenuEntradaSelect] = useState<Number>(1)

  const handleClickMenu = (menuSelect: number) => {
    setMenuEntradaSelect(menuSelect)
  }

  const handleLogin = () => {
      try {
          dispatch(loginWithGoogleThunk())
      } catch (error) {
          console.error(error)
      }
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-4">
      <div className="w-full h-18 flex justify-evenly gap-3">
        <button className={`dark:text-white ${menuEntradaSelect === 1 ? 'font-medium' : 'font-light'} cursor-pointer w-full h-full content-center`}
          onClick={() => handleClickMenu(1)}>Login</button>
        <div className="text-primary dark:text-white content-center">|</div>
        <button className={`dark:text-gray-200 ${menuEntradaSelect === 2 ? 'font-medium' : 'font-light'} cursor-pointer w-full h-full content-center`}
          onClick={() => handleClickMenu(2)}>Registrar</button>
      </div>
      <div className="w-full h-full flex flex-col gap-5 items-center">
        {menuEntradaSelect === 1 ?
          <>
            <FormLogin />
            <Link to={menuEntradaSelect === 1 ? "/app" : "/entrar"} >
              <Button variant="default" className=" text-black text-xl h-10 cursor-pointer"> Entrar </Button>
            </Link>
          </> :
          <>
            <FormRegistrar />
            <Button variant="default" className=" text-black text-xl h-10 cursor-pointer"
              onClick={() => handleClickMenu(1)} >
              Registrar
            </Button>
          </>
        }
        <a className="dark:text-white text-[.7rem] cursor-pointer w-full h-fit content-center" href="">Esqueci minha senha</a>
        <Button variant="outline" className=" text-black text-md h-10 cursor-pointer dark:text-primary font-light w-fit"
          onClick={handleLogin} >
          Google
        </Button>
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
      <InputApp type="password" placeholder="Repita a Senha" />
    </div>
  )
}