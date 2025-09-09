import { Header, HeaderApp, HeaderEntrada } from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { MenuNavegacao } from '../nav-inferior'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export function LayoutApp() {
    return (
        <div className='flex flex-col w-full h-screen bg-gray-900'>
            <header className='h-full max-h-9/12 w-full px-8 bg-amber-500 overflow-hidden'>
                <HeaderApp />
            </header>
            <main className='h-full max-h-3/12 w-full flex flex-col justify-center px-8 overflow-hidden'>
                <Outlet />
            </main>
        </div>
    )
}

export function LayoutEntrada() {
    return (
        <div className='flex flex-col w-full h-screen bg-gray-900'>
            <header className='h-44 w-full bg-amber-500 overflow-hidden'>
                <HeaderEntrada />
            </header>
            <main className='h-full w-full flex flex-col justify-center px-8 overflow-hidden'>
                <Outlet />
            </main>
        </div>
    )
}

export function Layout() {
    const navigationTitles = useSelector((state: RootState) => state.navegar)
    return (
        <>
            <Header title={navigationTitles.title} subtitle={navigationTitles.subtitle} />
            <main className='main  flex flex-col w-full h-full bg-gray-900 overflow-y-auto '>
                <Outlet />
            </main>
            <footer>
                <MenuNavegacao />
            </footer>
        </>
    )
}
