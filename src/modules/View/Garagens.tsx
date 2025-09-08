import { useState } from 'react'
import FiltroVagas from '../../components/Filtro/FiltroVagas'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ElementSituation, GarageBase } from '../../components/Garagem/garages'
import { ModalDownUp } from '../../components/Modal/modal'

function Garagens() {
      const garagensDataLista = useSelector((state: RootState) => state.garagens)
      const [openModal, setOpenModal] = useState(true)
    return (
        <>
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
            )}</>
    )
}

export default Garagens