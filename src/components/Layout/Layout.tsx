import { Header } from '../Header/Header'
import { Outlet } from 'react-router-dom'
import { MenuNavegacao } from '../nav-inferior'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

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
