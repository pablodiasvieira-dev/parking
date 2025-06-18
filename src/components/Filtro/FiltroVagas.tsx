
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { BotaoBase } from '../Botoes/button';
import { filtroSetBloco } from '../../redux/garagemSlice';
import { useDispatch } from 'react-redux';

interface filtroVagasProps {
    blocoSelecionado: string,
}

interface Bloco {
    id: number;
    siglaBloco: string;
    nomeBloco: string
}

const nomeBloco: Bloco[] = [
    { id: 0, siglaBloco: "A", nomeBloco: "Bloco A" },
    { id: 1, siglaBloco: "B", nomeBloco: "Bloco B" },
    { id: 2, siglaBloco: "C", nomeBloco: "Bloco C" },
    { id: 3, siglaBloco: "D", nomeBloco: "Bloco D" },
    { id: 4, siglaBloco: "E", nomeBloco: "Bloco E" },
    { id: 5, siglaBloco: "F", nomeBloco: "Bloco F" },
    { id: 6, siglaBloco: "G", nomeBloco: "Bloco G" },
    { id: 7, siglaBloco: "H", nomeBloco: "Bloco H" }
]


export default function FiltroVagas({blocoSelecionado} : filtroVagasProps) {
    const dispatch = useDispatch()
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
        <div className='filtros-vagas relative h-20 w-full flex items-center justify-center overflow-x-hidden shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]'>
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
                <ChevronLeft size={20} className='w-full h-full' />
            </button>
            <div ref={scrollRef} className='w-full h-full px-10 flex justify-start items-center gap-3 overflow-x-hidden scrollbar-hide'>
                {nomeBloco.map((bloco) => (
                    <div key={bloco.id} ref={(el) => { itemRefs.current[bloco.id] = el }} className='h-full min-w-26 flex items-center justify-center'>
                        <BotaoBase name={bloco.nomeBloco} isSelected={bloco.siglaBloco === blocoSelecionado}
                            executaAcao={() => {
                                dispatch( filtroSetBloco(bloco.siglaBloco) )
                                scrollToItem(bloco.id)
                            }} />
                    </div>
                ))}
            </div>
            <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
                <ChevronRight size={20} className='w-full h-full' />
            </button>
        </div>
    )
}
