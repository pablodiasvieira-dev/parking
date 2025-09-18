import { useEffect, useRef, useState } from 'react'
import FiltroVagas from '../../components/Filtro/FiltroVagas'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ElementSituation, GarageBase } from '../../components/Garagem/garages'
import { ModalDownUp } from '../../components/Modal/modal'
import { setSubTitleNavigation, setTitleNavigation } from '../../redux/navigationSlice'
import {  TVagaOut } from '@/api/api'

interface IGaragens {
    user: any
}

function Garagens({ user }: IGaragens) {
    if (!user) return (<div>Você precisa estar autenticado para acessar esta página.</div>)
    const dispatch: AppDispatch = useDispatch()
    const garagensDataLista = useSelector((state: RootState) => state.garagens)

    const [vagaSelecionada, setVagaSelecionada] = useState<TVagaOut | null>(null)
    const vagaRefDireita = useRef<HTMLDivElement | null>(null)
    const vagaRefEsquerda = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        dispatch(setTitleNavigation("Estacionamento"))
        dispatch(setSubTitleNavigation("Prédio Público"))
    }, [dispatch]
    )
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if ((vagaRefDireita.current && !vagaRefDireita.current.contains(event.target as Node) || (vagaRefEsquerda.current && !vagaRefEsquerda.current.contains(event.target as Node)))) {
                setVagaSelecionada(null)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [vagaSelecionada])

    const handleClickVaga = (vagaAtual: TVagaOut) => {
        if (vagaAtual && vagaAtual.status !== "lock") {
            setVagaSelecionada({ id: vagaAtual.id, number: vagaAtual.number, bloco: vagaAtual.bloco, status: vagaAtual.status })
        } else {
            setVagaSelecionada(null)
        }
        console.log(vagaAtual)
    }

    return (
        <>
            <div className='w-full h-full flex flex-col' >
                <FiltroVagas blocoSelecionado={garagensDataLista.filtros.blocoSelecionado} />
                <div className='conteudo w-full h-full px-8 flex flex-col overflow-y-auto'>
                    <div className='area-vagas w-full flex flex-row justify-between' >
                        <div ref={vagaRefEsquerda} className='esquerda border-t-2 border-l-2 border-primary-foreground '>
                            {garagensDataLista.apiGaragens
                                .filter((garagens => garagens.bloco === garagensDataLista.filtros.blocoSelecionado && garagens.right === false))
                                .map(
                                (item, index) => (
                                    <GarageBase key={index.toString()}
                                        isRight={item.right}
                                        numberVacancy={item.number}
                                        statusVacancy={item.status}
                                        isSelect={vagaSelecionada?.id === item.id}
                                        clicaNaVaga={() => handleClickVaga(item)}
                                        children={
                                            <ElementSituation isRight={item.right} statusVacancy={item.status} />
                                        }
                                    />)
                            )}
                        </div>
                        <div ref={vagaRefDireita} className='direita border-t-2 border-r-2 border-primary-foreground '>
                            {garagensDataLista.apiGaragens
                                .filter((garagens => garagens.bloco === garagensDataLista.filtros.blocoSelecionado && garagens.right))
                                .map(
                                (item, index) => (
                                    <GarageBase key={index.toString()}
                                        isRight={item.right}
                                        numberVacancy={item.number}
                                        statusVacancy={item.status}
                                        isSelect={vagaSelecionada?.id === item.id}
                                        clicaNaVaga={() => handleClickVaga(item)}
                                        children={
                                            <ElementSituation isRight={item.right} statusVacancy={item.status} />
                                        }
                                    />)
                            )}
                        </div>
                    </div>
                </div>
                <ModalDownUp isSelect={!!vagaSelecionada}
                    vagaSelecionada={`${vagaSelecionada?.number}-${vagaSelecionada?.bloco}`}
                    vagaLivreBloco={garagensDataLista.apiGaragens.filter(
                        item => item.bloco === garagensDataLista.filtros.blocoSelecionado && item.status === "unlock"
                    ).length}
                    vagasTotaisBloco={garagensDataLista.apiGaragens.filter(
                        item => item.bloco === garagensDataLista.filtros.blocoSelecionado
                    ).length} />
            </div>
        </>
    )
}

export default Garagens