import './App.css'
import { MenuNavegacao } from './components/nav-inferior';
import { Header } from './components/Header/Header';
import Garagens from './modules/View/Garagens';



function App() {



  return (
    <>
      <Header />
      <main className='main  flex flex-col w-full h-full bg-gray-900 overflow-y-auto '>
        <Garagens />
      </main>
      <footer>
        <MenuNavegacao />
      </footer>
    </>
  )
}

export default App
