import { useEffect, useRef, useState } from 'react'
import FiltroVagas from '../../components/Filtro/FiltroVagas'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ElementSituation, GarageBase } from '../../components/Garagem/garages'
import { ModalDownUp } from '../../components/Modal/modal'
import { TVagaOut } from '@/constrains/models'
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
        item => item.bloco_id === garagensDataLista.filtros.blocoSelecionado && item.status === "unlock").length

    const vagasTotaisBloco = garagensDataLista.apiGaragens.filter(
        item => item.bloco_id === garagensDataLista.filtros.blocoSelecionado).length

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
                (modalRef.current && !modalRef.current.contains(event.target as Node))
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
            setVagaSelecionada({
                id: vagaAtual.id,
                number: vagaAtual.number,
                bloco_id: vagaAtual.bloco_id,
                status: vagaAtual.status
            })
        } else {
            setMostrarFormulario(false)
            setVagaSelecionada(null)
        }
    }

    return (
        <>
            <div className='conteudo w-full h-full flex flex-col md:flex-row overflow-y-hidden md:px-6 md:py-2 md:gap-4'>
                <div className='conteudo w-full md:min-w-2/3 h-full flex flex-col bg-foreground dark:bg-transparent md:rounded-xl'>
                    <FiltroVagas blocoSelecionado={garagensDataLista.filtros.blocoSelecionado} />
                    <div className='area-vagas w-full h-full flex md:flex-col justify-evenly items-center overflow-y-auto px-8 py-1 md:gap-8 ' >
                        <div ref={vagaRefEsquerda} className='esquerda flex flex-col md:flex-row gap-0 border-t-2 border-l-2 border-primary dark:border-primary-foreground '>
                            {
                                garagensDataLista.apiGaragens
                                    .filter((garagens => garagens.bloco_id === garagensDataLista.filtros.blocoSelecionado && garagens.is_right === false))
                                    .map(
                                        (item, index) => (
                                            <GarageBase key={index.toString()}
                                                isRight={item.is_right}
                                                numberVacancy={item.number}
                                                statusVacancy={item.status}
                                                isSelect={vagaSelecionada?.id === item.id}
                                                clicaNaVaga={() => handleClickVaga(item)}
                                                children={
                                                    <ElementSituation isRight={item.is_right} statusVacancy={item.status} isSelect={vagaSelecionada?.id === item.id} />
                                                }
                                            />
                                        )
                                    )}
                        </div>
                        <div ref={vagaRefDireita} className='direita flex flex-col md:flex-row border-t-2 md:border-t-0 md:border-b-2 border-r-2 md:border-l-2 md:border-r-0 border-primary dark:border-primary-foreground '>
                            {garagensDataLista.apiGaragens
                                .filter((garagens => garagens.bloco_id === garagensDataLista.filtros.blocoSelecionado && garagens.is_right))
                                .map(
                                    (item, index) => (
                                        <GarageBase key={index.toString()}
                                            isRight={item.is_right}
                                            numberVacancy={item.number}
                                            statusVacancy={item.status}
                                            isSelect={vagaSelecionada?.id === item.id}
                                            clicaNaVaga={() => handleClickVaga(item)}
                                            children={
                                                <ElementSituation isRight={item.is_right} statusVacancy={item.status} isSelect={vagaSelecionada?.id === item.id} />
                                            }
                                        />)
                                )}
                        </div>
                    </div>
                </div>
                <div className='modal sticky bottom-0 z-40 bg-white md:bg-foreground
                    flex flex-col w-full h-fit md:min-w-1/3
                    gap-1 rounded-t-2xl shadow-[0px_-10px_10px_-1px_rgba(0,_0,_0,_0.45)]
                    md:h-full md:rounded-b-2xl md:shadow-none md:static md:bottom-full md:z-0
                '>
                    <ModalDownUp ref={modalRef}
                        isSelect={!!vagaSelecionada}
                        blocoSelecionado={garagensDataLista.filtros.blocoSelecionado}
                        vagaSelecionada={vagaSelecionada}
                        vagaLivreBloco={vagaLivreBloco}
                        vagasTotaisBloco={vagasTotaisBloco}
                        exibirVaga={mostrarFormulario}
                        setExibirVaga={setMostrarFormulario} />
                </div>
            </div>
        </>
    )
}

export default Garagens