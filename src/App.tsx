import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ElementSituation, GarageBase } from './components/Garagem/garages'
import { BotaoBase } from './components/Botoes/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ModalDownUp } from './components/Modal/modal';
import { MenuNavegacao } from './components/nav-inferior';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { Header } from './components/Header/Header';
import FiltroVagas from './components/Filtro/FiltroVagas';



function App() {
  const garagensDataLista = useSelector((state: RootState) => state.garagens)
  const [openModal, setOpenModal] = useState(true)


  return (
    <>
      <Header />
      <main className='main  flex flex-col w-full h-full bg-gray-900 overflow-y-auto '>
        <FiltroVagas blocoSelecionado={garagensDataLista.filtros.blocoSelecionado} />
        <div className='conteudo w-full h-full px-8 flex flex-col overflow-y-auto'>
          <div className='area-vagas w-full flex flex-row justify-between' >
            <div className='esquerda border-y-2 border-l-2'>
              {garagensDataLista.apiGaragens.map(
                (item, index) => garagensDataLista.filtros.blocoSelecionado === item.bloco && !item.right && (
                  <GarageBase key={index.toString()} isRight={item.right} numberVacancy={item.number}
                    clicaNaVaga={() => setOpenModal(!openModal)}
                    children={
                      <ElementSituation isRight={item.right} statusVacancy={item.status} />
                    }
                  />)
              )}
            </div>
            <div className='direita border-y-2 border-r-2'>
              {garagensDataLista.apiGaragens.map(
                (item, index) => garagensDataLista.filtros.blocoSelecionado === item.bloco && item.right && (
                  <GarageBase key={index.toString()} isRight={item.right} numberVacancy={item.number}
                    children={
                      <ElementSituation isRight={item.right} statusVacancy={item.status} />
                    }
                  />)
              )}
            </div>
          </div>
        </div>
        {openModal && (
          <ModalDownUp />
        )}
      </main>
      <footer>
        <MenuNavegacao />
      </footer>
    </>
  )
}

export default App
