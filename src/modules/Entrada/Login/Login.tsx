import { useState } from "react"
import { useDispatch } from "react-redux"
import { InputApp } from "../../../components/Form/Input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { createUserWithEmailThunk, loginWithEmailThunk, loginWithGoogleThunk } from "@/redux/authSlice"
import { AppDispatch } from "@/redux/store"


export function Login() {

  const dispatch: AppDispatch = useDispatch()

  const [menuEntradaSelect, setMenuEntradaSelect] = useState<Number>(1)

  const handleClickMenu = (menuSelect: number) => {
    setMenuEntradaSelect(menuSelect)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [confirmPass, setConfirmPass] = useState('');


  const handleLoginEmail = async (email:string, password:string) => {
      try {
          await dispatch(loginWithEmailThunk({email, password}))
      } catch (error) {
          console.error(error)
      }
  }

  const handleCreateUserWithEmail = async (nome: string, email:string, password:string) => {
    console.log(nome, email, password)
      try {
          await dispatch(createUserWithEmailThunk({nome, email, password}))
      } catch (error) {
          console.error(error)
      }
  }
  const handleLoginGoogle = async () => {
      try {
          await dispatch(loginWithGoogleThunk())
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
            <FormLogin 
              email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword} />

            <Link to={menuEntradaSelect === 1 ? "/app" : "/entrar"} >
              <Button variant="default" className=" text-black text-xl h-10 cursor-pointer" onClick={() => handleLoginEmail(email, password)}> Entrar </Button>
            </Link>
          </> :
          <>
            <FormRegistrar 
              nome={nome} setNome={setNome} 
              email={email} setEmail={setEmail} 
              password={password} setPassword={setPassword} 
              confirmPass={confirmPass} setConfirmPass={setConfirmPass} />
            <Button variant="default" className=" text-black text-xl h-10 cursor-pointer"
              onClick={() => handleCreateUserWithEmail(nome, email, password)} >
              Registrar
            </Button>
          </>
        }
        <a className="dark:text-white text-[.7rem] cursor-pointer w-full h-fit content-center" href="">Esqueci minha senha</a>
        <Button variant="outline" className=" text-black text-md h-10 cursor-pointer dark:text-primary font-light w-fit"
          onClick={handleLoginGoogle} >
          Google
        </Button>
      </div>
    </div>
  )
}

interface FormLoginProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
}

export function FormLogin({email, setEmail, password, setPassword}: FormLoginProps) {

  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <InputApp type="email" placeholder="E-mail" valor={email} setValor={setEmail} />
      <InputApp type="password" placeholder="Senha" valor={password} setValor={setPassword} />
    </div>
  )
}

interface FormRegisterProps {
  nome: string
  setNome: (nome: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPass: string
  setConfirmPass: (confirmPass: string) => void
}
export function FormRegistrar({nome, setNome, email, setEmail, password, setPassword, confirmPass, setConfirmPass}: FormRegisterProps) {
  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <InputApp type="fullname" placeholder="Nome Completo" valor={nome} setValor={setNome} />
      <InputApp type="email" placeholder="E-mail" valor={email} setValor={setEmail} />
      <InputApp type="password" placeholder="Senha" valor={password} setValor={setPassword} />
      <InputApp type="password" placeholder="Repita a Senha" valor={confirmPass} setValor={setConfirmPass} />
    </div>
  )
}