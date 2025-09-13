import { useEffect, useState } from 'react'
import FiltroVagas from '../../components/Filtro/FiltroVagas'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ElementSituation, GarageBase } from '../../components/Garagem/garages'
import { ModalDownUp } from '../../components/Modal/modal'
import { setSubTitleNavigation, setTitleNavigation } from '../../redux/navigationSlice'

interface IGaragens {
    user: any
}

function Garagens({user}: IGaragens) {
    if(!user) return (<div>Você precisa estar autenticado para acessar esta página.</div>)
    const dispatch = useDispatch()
    const garagensDataLista = useSelector((state: RootState) => state.garagens)
    const [openModal, setOpenModal] = useState(true)

    useEffect (() => {
        dispatch(setTitleNavigation("Estacionamento"))
        dispatch(setSubTitleNavigation("Prédio Público"))
        }, [dispatch]
    ) 
    return (
        <>
            <FiltroVagas blocoSelecionado={garagensDataLista.filtros.blocoSelecionado} />
            <div className='conteudo w-full h-full px-8 flex flex-col overflow-y-auto'>
                <div className='area-vagas w-full flex flex-row justify-between' >
                    <div className='esquerda border-y-2 border-l-2 border-primary'>
                        {garagensDataLista.apiGaragens.map(
                            (item, index) => garagensDataLista.filtros.blocoSelecionado === item.bloco && !item.right && (
                                <GarageBase key={index.toString()} isRight={item.right} numberVacancy={item.number} statusVacancy={item.status}
                                    clicaNaVaga={() => setOpenModal(!openModal)}
                                    children={
                                        <ElementSituation isRight={item.right} statusVacancy={item.status} />
                                    }
                                />)
                        )}
                    </div>
                    <div className='direita border-y-2 border-r-2 border-primary'>
                        {garagensDataLista.apiGaragens.map(
                            (item, index) => garagensDataLista.filtros.blocoSelecionado === item.bloco && item.right && (
                                <GarageBase key={index.toString()} isRight={item.right} numberVacancy={item.number} statusVacancy={item.status}
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