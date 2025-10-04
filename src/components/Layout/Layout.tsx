import { Header, HeaderApp, HeaderDesktop, HeaderEntrada } from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuNavegacao } from '../NavBar'
import { ModeToggle } from '../mode-toggle'
import { BemVindo } from '@/modules/Entrada/BemVindo'
import { Login } from '@/modules/Entrada/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { useEffect } from 'react'
import { getBlocosThunk } from '@/redux/garagemSlice'

export function BaseLayout() {
    return (
        <div className='@container flex flex-col w-full h-screen bg-background m-0 text-center '>
            <Outlet />
        </div>
    )
}

export function LayoutBemVindo() {
    return (
        <div className='flex flex-col w-full h-full'>
            <header className='h-full max-h-9/12 w-full px-8 bg-primary overflow-hidden'>
                <HeaderApp />
            </header>
            <main className='h-full max-h-3/12 w-full flex flex-col justify-center px-8 overflow-hidden'>
                <BemVindo />
            </main>
        </div>
    )
}


export function LayoutEntrada() {
    // const user = useSelector((state: RootState) => state.auth.user);
    const user = useSelector((state: RootState) => state.authsupa.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate("/app");
        
    }, [user, navigate])

    return (
        <div className='flex flex-col w-full h-full'>
            <header className='h-44 w-full bg-primary overflow-hidden'>
                <HeaderEntrada />
            </header>
            <main className='h-full w-full flex flex-col justify-center px-8 overflow-hidden'>
                <Login />
            </main>
            <footer className='flex justify-between items-center p-2'>
                <p className='text-black dark:text-primary-foreground text-[.6rem] w-full text-center'>
                    Desenvolvido por:
                    <a className='text-primary text-[.6rem] cursor-pointer w-full text-center' href="https://github.com/pablodiasvieira-dev/" target='_blank'> Páblo</a>
                </p>
                <ModeToggle />
            </footer>
        </div>
    )
}

interface ILayoutApp {
    children: React.ReactNode
}

export function LayoutApp({ children }: ILayoutApp) {
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
    // dispatch(listenToAuthChanges())
    dispatch(getBlocosThunk())
    }, [dispatch])

    const navigationTitles = useSelector((state: RootState) => state.navegar)
    // const blocos = useSelector((state: RootState) => state.garagens.blocos)

    return (
        <>
            <header className='h-20 w-full overflow-hidden flex '>
                <div className="block md:hidden h-full w-full">
                    <Header title={navigationTitles.title} subtitle={navigationTitles.subtitle} />
                </div>
                <div className="hidden md:block w-full h-full">
                    <HeaderDesktop />
                </div>
            </header>
            <main className='flex md:flex-col w-full h-full overflow-y-hidden '>
                {children}
            </main>
            <footer className="block md:hidden">
                <MenuNavegacao />
            </footer>
        </>
    )
}
