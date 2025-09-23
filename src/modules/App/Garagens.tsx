import { useEffect, useRef, useState } from 'react'
import FiltroVagas from '../../components/Filtro/FiltroVagas'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ElementSituation, GarageBase } from '../../components/Garagem/garages'
import { ModalDownUp } from '../../components/Modal/modal'
import { TVagaOut } from '@/api/api'
import { setNavigation } from '@/redux/navigationSlice'

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
    const modalRef = useRef<HTMLDivElement | null>(null)

    const [mostrarFormulario, setMostrarFormulario] = useState(false)


    const vagaLivreBloco = garagensDataLista.apiGaragens.filter(
        item => item.bloco === garagensDataLista.filtros.blocoSelecionado && item.status === "unlock").length

    const vagasTotaisBloco = garagensDataLista.apiGaragens.filter(
        item => item.bloco === garagensDataLista.filtros.blocoSelecionado).length

    useEffect(() => {
        dispatch(setNavigation({ id: 3, title: "Estacionamento", subtitle: "Vagas por Bloco" }))
    }, [dispatch]
    )
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement
            const isClickInsideRadixComponent = target.closest('[data-radix-popper-content-wrapper]')
            if (isClickInsideRadixComponent) {
                return;
            }

            if (
                (vagaRefDireita.current && !vagaRefDireita.current.contains(event.target as Node)) &&
                (vagaRefEsquerda.current && !vagaRefEsquerda.current.contains(event.target as Node)) &&
                (modalRef.current && !modalRef.current.contains(event.target as Node) )
            ) {
                setMostrarFormulario(false)
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
            setMostrarFormulario(true)
            setVagaSelecionada({ id: vagaAtual.id, number: vagaAtual.number, bloco: vagaAtual.bloco, status: vagaAtual.status })
        } else {
            setMostrarFormulario(false)
            setVagaSelecionada(null)
        }
    }

    return (
        <>
            <div className='w-full h-full flex flex-col overflow-y-hidden' >
                <FiltroVagas blocoSelecionado={garagensDataLista.filtros.blocoSelecionado} />
                <div className='conteudo w-full h-full px-8 py-1 flex flex-col overflow-y-auto'>
                    <div className='area-vagas w-full flex flex-row justify-between' >
                        <div ref={vagaRefEsquerda} className='esquerda border-t-2 border-l-2 border-primary dark:border-primary-foreground '>
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
                                                <ElementSituation isRight={item.right} statusVacancy={item.status} isSelect={vagaSelecionada?.id === item.id} />
                                            }
                                        />)
                                )}
                        </div>
                        <div ref={vagaRefDireita} className='direita border-t-2 border-r-2 border-primary dark:border-primary-foreground '>
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
                                                <ElementSituation isRight={item.right} statusVacancy={item.status} isSelect={vagaSelecionada?.id === item.id} />
                                            }
                                        />)
                                )}
                        </div>
                    </div>
                </div>
                <ModalDownUp ref = {modalRef}
                    isSelect={!!vagaSelecionada}
                    blocoSelecionado={garagensDataLista.filtros.blocoSelecionado}
                    listaVagasBloco={garagensDataLista.apiGaragens}
                    vagaSelecionada={vagaSelecionada}
                    vagaLivreBloco={vagaLivreBloco}
                    vagasTotaisBloco={vagasTotaisBloco}
                    exibirVaga={mostrarFormulario}
                    setExibirVaga={setMostrarFormulario} />
            </div>
        </>
    )
}

export default Garagens