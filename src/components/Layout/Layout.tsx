import { Header, HeaderApp, HeaderEntrada } from '../Header/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { MenuNavegacao } from '../nav-inferior'
import { ModeToggle } from '../mode-toggle'
import { BemVindo } from '@/modules/Entrada/BemVindo'
import { Login } from '@/modules/Entrada/Login/Login'
import Garagens from '@/modules/App/Garagens'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useEffect } from 'react'

export function BaseLayout() {
    return (
        <div className='flex flex-col w-full h-screen bg-background'>
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
    const user = useSelector((state: RootState) => state.auth.user);
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
    user: any
}

export function LayoutApp({ user }: ILayoutApp) {
    const navigationTitles = useSelector((state: RootState) => state.navegar)
    return (
        <>
            <header className='h-20 w-full bg-primary overflow-hidden'>
                <Header title={navigationTitles.title} subtitle={navigationTitles.subtitle} />
            </header>
            <main className='main  flex flex-col w-full h-full bg-gray-900 overflow-y-auto '>
                <Garagens user={user} />
            </main>
            <footer>
                <MenuNavegacao />
            </footer>
        </>
    )
}
