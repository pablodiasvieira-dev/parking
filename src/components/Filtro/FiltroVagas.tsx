
import { ChevronLeft, ChevronRight } from 'lucide-react';
import  { useEffect, useRef } from 'react'
import { BotaoBase } from '../Botoes/button';
import { filtroSetBloco } from '../../redux/garagemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface filtroVagasProps {
    blocoSelecionado: number,
}

export default function FiltroVagas({blocoSelecionado} : filtroVagasProps) {
    
    const dispatch = useDispatch()
    const blocosState = useSelector((state: RootState) => state.garagens.blocos)

    const scrollRef = useRef<HTMLDivElement>(null)
    const itemRefs = useRef<Record<number, HTMLDivElement | null>>({})
    // const [blocoSelecionado, setBlocoSelecionado] = useState("A")

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.5;

            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const scrollToItem = (blocoId: number) => {
        const container = scrollRef.current;
        const item = itemRefs.current[blocoId];

        if (!container || !item) return;

        const scrollLeft = blocoId * 116
        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    };

    useEffect(() => { }, [dispatch]);
    return (
        <div className='filtros-vagas relative md:px-2 h-20 w-full flex items-center justify-center overflow-x-hidden shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]'>
            <button
                onClick={() => scroll('left')}
                className="absolute md:static left-0 md:left-2 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
                <ChevronLeft size={20} className='w-full h-full' />
            </button>
            <div ref={scrollRef} className='w-full h-full px-10 md:px-2 flex justify-start  items-center gap-3 md:gap-2 overflow-x-hidden '>
                {blocosState.map((bloco) => (
                    <div key={bloco.id} ref={(el) => { itemRefs.current[bloco.id] = el }} className='h-full min-w-26 flex items-center justify-center'>
                        <BotaoBase name={bloco.nome_bloco} isSelected={bloco.id === blocoSelecionado}
                            executaAcao={() => {
                                dispatch( filtroSetBloco(bloco.id) )
                                scrollToItem(bloco.id)
                            }} />
                    </div>
                ))}
            </div>
            <button
                onClick={() => scroll('right')}
                className="absolute md:static right-0 md:right-2 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
                <ChevronRight size={20} className='w-full h-full' />
            </button>
        </div>
    )
}
