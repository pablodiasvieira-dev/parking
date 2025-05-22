import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ElementSituation, GarageBase } from './components/garages'
import { BotaoBase } from './components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ModalDownUp } from './components/modal';
import { MenuNavegacao } from './components/nav-inferior';

interface Vacancy{
  id: string;
  number: string;
  right: boolean;
  status?: string;
  bloco?: string;
  ordemNoBloco?: string
}

interface Bloco {
  id: number;
  siglaBloco: string;
  nomeBloco: string
}

const nomeBloco : Bloco[] = [
  {id: 0, siglaBloco: "A",  nomeBloco: "Bloco A"},
  {id: 1, siglaBloco: "B", nomeBloco: "Bloco B"},
  {id: 2, siglaBloco: "C", nomeBloco: "Bloco C"},
  {id: 3, siglaBloco: "D", nomeBloco: "Bloco D"},
  {id: 4, siglaBloco: "E", nomeBloco: "Bloco E"},
  {id: 5, siglaBloco: "F", nomeBloco: "Bloco F"},
  {id: 6, siglaBloco: "G", nomeBloco: "Bloco G"},
  {id: 7, siglaBloco: "H", nomeBloco: "Bloco H"}
]

//  status: 'lock', 'unlock', 'use', 'reserved'
const vacancyNumber : Vacancy[] = [
  // Bloco A
  {id: "1",  number: "101", right: false, status: "lock", bloco: "A", ordemNoBloco: "1"},
  {id: "2",  number: "102", right: false, status: "use", bloco: "A", ordemNoBloco: "2"},
  {id: "3",  number: "103", right: false, status: "lock", bloco: "A", ordemNoBloco: "3"},
  {id: "4",  number: "103", right: false, status: "lock", bloco: "A", ordemNoBloco: "4"},
  {id: "5",  number: "104", right: false, status: "lock", bloco: "A", ordemNoBloco: "5"},
  {id: "6",  number: "105", right: false, status: "unlock", bloco: "A", ordemNoBloco: "6"},
  {id: "7",  number: "106", right: false, status: "use", bloco: "A", ordemNoBloco: "7"},
  {id: "8",  number: "106", right: false, status: "use", bloco: "A", ordemNoBloco: "8"},
  {id: "9",  number: "201", right: true, status: "unlock", bloco: "A", ordemNoBloco: "9"},
  {id: "10", number: "202", right: true, status: "use", bloco: "A", ordemNoBloco: "10"},
  {id: "11", number: "203", right: true, status: "reserved", bloco: "A", ordemNoBloco: "11"},
  {id: "12", number: "203", right: true, status: "reserved", bloco: "A", ordemNoBloco: "12"},
  {id: "13", number: "204", right: true, status: "use", bloco: "A", ordemNoBloco: "13"},
  {id: "14", number: "205", right: true, status: "use", bloco: "A", ordemNoBloco: "14"},
  {id: "15", number: "206", right: true, status: "use", bloco: "A", ordemNoBloco: "15"},
  {id: "16", number: "206", right: true, status: "use", bloco: "A", ordemNoBloco: "16"},

  // Bloco B
  {id: "17", number: "101", right: false, status: "lock", bloco: "B", ordemNoBloco: "1"},
  {id: "18", number: "102", right: false, status: "reserved", bloco: "B", ordemNoBloco: "2"},
  {id: "19", number: "103", right: false, status: "use", bloco: "B", ordemNoBloco: "3"},
  {id: "20", number: "103", right: false, status: "lock", bloco: "B", ordemNoBloco: "4"},
  {id: "21", number: "104", right: false, status: "unlock", bloco: "B", ordemNoBloco: "5"},
  {id: "22", number: "105", right: false, status: "use", bloco: "B", ordemNoBloco: "6"},
  {id: "23", number: "106", right: false, status: "lock", bloco: "B", ordemNoBloco: "7"},
  {id: "24", number: "106", right: false, status: "reserved", bloco: "B", ordemNoBloco: "8"},
  {id: "25", number: "201", right: true, status: "use", bloco: "B", ordemNoBloco: "9"},
  {id: "26", number: "202", right: true, status: "unlock", bloco: "B", ordemNoBloco: "10"},
  {id: "27", number: "203", right: true, status: "lock", bloco: "B", ordemNoBloco: "11"},
  {id: "28", number: "203", right: true, status: "use", bloco: "B", ordemNoBloco: "12"},
  {id: "29", number: "204", right: true, status: "use", bloco: "B", ordemNoBloco: "13"},
  {id: "30", number: "205", right: true, status: "lock", bloco: "B", ordemNoBloco: "14"},
  {id: "31", number: "206", right: true, status: "unlock", bloco: "B", ordemNoBloco: "15"},
  {id: "32", number: "206", right: true, status: "reserved", bloco: "B", ordemNoBloco: "16"},

  // Bloco C
  {id: "33", number: "101", right: false, status: "unlock", bloco: "C", ordemNoBloco: "1"},
  {id: "34", number: "102", right: false, status: "use", bloco: "C", ordemNoBloco: "2"},
  {id: "35", number: "103", right: false, status: "reserved", bloco: "C", ordemNoBloco: "3"},
  {id: "36", number: "103", right: false, status: "use", bloco: "C", ordemNoBloco: "4"},
  {id: "37", number: "104", right: false, status: "lock", bloco: "C", ordemNoBloco: "5"},
  {id: "38", number: "105", right: false, status: "use", bloco: "C", ordemNoBloco: "6"},
  {id: "39", number: "106", right: false, status: "reserved", bloco: "C", ordemNoBloco: "7"},
  {id: "40", number: "106", right: false, status: "use", bloco: "C", ordemNoBloco: "8"},
  {id: "41", number: "201", right: true, status: "unlock", bloco: "C", ordemNoBloco: "9"},
  {id: "42", number: "202", right: true, status: "lock", bloco: "C", ordemNoBloco: "10"},
  {id: "43", number: "203", right: true, status: "lock", bloco: "C", ordemNoBloco: "11"},
  {id: "44", number: "203", right: true, status: "use", bloco: "C", ordemNoBloco: "12"},
  {id: "45", number: "204", right: true, status: "reserved", bloco: "C", ordemNoBloco: "13"},
  {id: "46", number: "205", right: true, status: "unlock", bloco: "C", ordemNoBloco: "14"},
  {id: "47", number: "206", right: true, status: "use", bloco: "C", ordemNoBloco: "15"},
  {id: "48", number: "206", right: true, status: "lock", bloco: "C", ordemNoBloco: "16"},

    // Bloco D
    {id: "49",  number: "101", right: false, status: "use", bloco: "D", ordemNoBloco: "1"},
    {id: "50",  number: "102", right: false, status: "unlock", bloco: "D", ordemNoBloco: "2"},
    {id: "51",  number: "103", right: false, status: "reserved", bloco: "D", ordemNoBloco: "3"},
    {id: "52",  number: "103", right: false, status: "lock", bloco: "D", ordemNoBloco: "4"},
    {id: "53",  number: "104", right: false, status: "use", bloco: "D", ordemNoBloco: "5"},
    {id: "54",  number: "105", right: false, status: "lock", bloco: "D", ordemNoBloco: "6"},
    {id: "55",  number: "106", right: false, status: "reserved", bloco: "D", ordemNoBloco: "7"},
    {id: "56",  number: "106", right: false, status: "unlock", bloco: "D", ordemNoBloco: "8"},
    {id: "57",  number: "201", right: true, status: "use", bloco: "D", ordemNoBloco: "9"},
    {id: "58",  number: "202", right: true, status: "use", bloco: "D", ordemNoBloco: "10"},
    {id: "59",  number: "203", right: true, status: "lock", bloco: "D", ordemNoBloco: "11"},
    {id: "60",  number: "203", right: true, status: "reserved", bloco: "D", ordemNoBloco: "12"},
    {id: "61",  number: "204", right: true, status: "unlock", bloco: "D", ordemNoBloco: "13"},
    {id: "62",  number: "205", right: true, status: "lock", bloco: "D", ordemNoBloco: "14"},
    {id: "63",  number: "206", right: true, status: "use", bloco: "D", ordemNoBloco: "15"},
    {id: "64",  number: "206", right: true, status: "use", bloco: "D", ordemNoBloco: "16"},
  
    // Bloco E
    {id: "65",  number: "101", right: false, status: "lock", bloco: "E", ordemNoBloco: "1"},
    {id: "66",  number: "102", right: false, status: "use", bloco: "E", ordemNoBloco: "2"},
    {id: "67",  number: "103", right: false, status: "unlock", bloco: "E", ordemNoBloco: "3"},
    {id: "68",  number: "103", right: false, status: "use", bloco: "E", ordemNoBloco: "4"},
    {id: "69",  number: "104", right: false, status: "reserved", bloco: "E", ordemNoBloco: "5"},
    {id: "70",  number: "105", right: false, status: "use", bloco: "E", ordemNoBloco: "6"},
    {id: "71",  number: "106", right: false, status: "lock", bloco: "E", ordemNoBloco: "7"},
    {id: "72",  number: "106", right: false, status: "use", bloco: "E", ordemNoBloco: "8"},
    {id: "73",  number: "201", right: true, status: "unlock", bloco: "E", ordemNoBloco: "9"},
    {id: "74",  number: "202", right: true, status: "lock", bloco: "E", ordemNoBloco: "10"},
    {id: "75",  number: "203", right: true, status: "use", bloco: "E", ordemNoBloco: "11"},
    {id: "76",  number: "203", right: true, status: "reserved", bloco: "E", ordemNoBloco: "12"},
    {id: "77",  number: "204", right: true, status: "lock", bloco: "E", ordemNoBloco: "13"},
    {id: "78",  number: "205", right: true, status: "unlock", bloco: "E", ordemNoBloco: "14"},
    {id: "79",  number: "206", right: true, status: "reserved", bloco: "E", ordemNoBloco: "15"},
    {id: "80",  number: "206", right: true, status: "use", bloco: "E", ordemNoBloco: "16"},
  
    // Bloco F
    {id: "81",  number: "101", right: false, status: "reserved", bloco: "F", ordemNoBloco: "1"},
    {id: "82",  number: "102", right: false, status: "use", bloco: "F", ordemNoBloco: "2"},
    {id: "83",  number: "103", right: false, status: "lock", bloco: "F", ordemNoBloco: "3"},
    {id: "84",  number: "103", right: false, status: "unlock", bloco: "F", ordemNoBloco: "4"},
    {id: "85",  number: "104", right: false, status: "use", bloco: "F", ordemNoBloco: "5"},
    {id: "86",  number: "105", right: false, status: "reserved", bloco: "F", ordemNoBloco: "6"},
    {id: "87",  number: "106", right: false, status: "lock", bloco: "F", ordemNoBloco: "7"},
    {id: "88",  number: "106", right: false, status: "use", bloco: "F", ordemNoBloco: "8"},
    {id: "89",  number: "201", right: true, status: "unlock", bloco: "F", ordemNoBloco: "9"},
    {id: "90",  number: "202", right: true, status: "use", bloco: "F", ordemNoBloco: "10"},
    {id: "91",  number: "203", right: true, status: "reserved", bloco: "F", ordemNoBloco: "11"},
    {id: "92",  number: "203", right: true, status: "lock", bloco: "F", ordemNoBloco: "12"},
    {id: "93",  number: "204", right: true, status: "use", bloco: "F", ordemNoBloco: "13"},
    {id: "94",  number: "205", right: true, status: "unlock", bloco: "F", ordemNoBloco: "14"},
    {id: "95",  number: "206", right: true, status: "use", bloco: "F", ordemNoBloco: "15"},
    {id: "96",  number: "206", right: true, status: "lock", bloco: "F", ordemNoBloco: "16"},
  
    // Bloco G
    {id: "97",  number: "101", right: false, status: "unlock", bloco: "G", ordemNoBloco: "1"},
    {id: "98",  number: "102", right: false, status: "use", bloco: "G", ordemNoBloco: "2"},
    {id: "99",  number: "103", right: false, status: "reserved", bloco: "G", ordemNoBloco: "3"},
    {id: "100", number: "103", right: false, status: "lock", bloco: "G", ordemNoBloco: "4"},
    {id: "101", number: "104", right: false, status: "use", bloco: "G", ordemNoBloco: "5"},
    {id: "102", number: "105", right: false, status: "unlock", bloco: "G", ordemNoBloco: "6"},
    {id: "103", number: "106", right: false, status: "lock", bloco: "G", ordemNoBloco: "7"},
    {id: "104", number: "106", right: false, status: "use", bloco: "G", ordemNoBloco: "8"},
    {id: "105", number: "201", right: true, status: "use", bloco: "G", ordemNoBloco: "9"},
    {id: "106", number: "202", right: true, status: "reserved", bloco: "G", ordemNoBloco: "10"},
    {id: "107", number: "203", right: true, status: "lock", bloco: "G", ordemNoBloco: "11"},
    {id: "108", number: "203", right: true, status: "unlock", bloco: "G", ordemNoBloco: "12"},
    {id: "109", number: "204", right: true, status: "use", bloco: "G", ordemNoBloco: "13"},
    {id: "110", number: "205", right: true, status: "lock", bloco: "G", ordemNoBloco: "14"},
    {id: "111", number: "206", right: true, status: "reserved", bloco: "G", ordemNoBloco: "15"},
    {id: "112", number: "206", right: true, status: "use", bloco: "G", ordemNoBloco: "16"},
  
    // Bloco H
    {id: "113", number: "101", right: false, status: "reserved", bloco: "H", ordemNoBloco: "1"},
    {id: "114", number: "102", right: false, status: "lock", bloco: "H", ordemNoBloco: "2"},
    {id: "115", number: "103", right: false, status: "unlock", bloco: "H", ordemNoBloco: "3"},
    {id: "116", number: "103", right: false, status: "use", bloco: "H", ordemNoBloco: "4"},
    {id: "117", number: "104", right: false, status: "lock", bloco: "H", ordemNoBloco: "5"},
    {id: "118", number: "105", right: false, status: "reserved", bloco: "H", ordemNoBloco: "6"},
    {id: "119", number: "106", right: false, status: "use", bloco: "H", ordemNoBloco: "7"},
    {id: "120", number: "106", right: false, status: "lock", bloco: "H", ordemNoBloco: "8"},
    {id: "121", number: "201", right: true, status: "unlock", bloco: "H", ordemNoBloco: "9"},
    {id: "122", number: "202", right: true, status: "lock", bloco: "H", ordemNoBloco: "10"},
    {id: "123", number: "203", right: true, status: "use", bloco: "H", ordemNoBloco: "11"},
    {id: "124", number: "203", right: true, status: "unlock", bloco: "H", ordemNoBloco: "12"},
    {id: "125", number: "204", right: true, status: "reserved", bloco: "H", ordemNoBloco: "13"},
    {id: "126", number: "205", right: true, status: "use", bloco: "H", ordemNoBloco: "14"},
    {id: "127", number: "206", right: true, status: "lock", bloco: "H", ordemNoBloco: "15"},
    {id: "128", number: "206", right: true, status: "use", bloco: "H", ordemNoBloco: "16"}
]

function App() {
  const [blocoSelecionado, setBlocoSelecionado] = useState("A")
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const [openModal, setOpenModal] = useState(true)

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

  useEffect(() => {}, [blocoSelecionado]);

  return (
    <>
      <main className='main relative flex flex-col w-full h-full bg-gray-900 '>
        <div className='cabecalho-geral flex flex-col  items-start sticky top-0 right-0 w-full h-20 bg-gray-900  z-50 px-8 py-2 shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]' >
          <span className='font-bold w-fit h-full text-3xl text-amber-400 content-center'>
            Estacionamento
          </span>
          <p className='w-fit h-full text-amber-50 font-light '>Prédio Publico</p>
        </div>
        <div className='filtros-vagas relative h-20 w-full flex items-center justify-center overflow-x-hidden shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]'>
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
            <ChevronLeft size={20} className='w-full h-full'/>
          </button>
          <div ref={scrollRef} className='w-full h-full px-10 flex justify-start items-center gap-3 overflow-x-hidden scrollbar-hide'>
            {nomeBloco.map( (bloco) => (
              <div key={bloco.id} ref={(el) => {itemRefs.current[bloco.id] = el} } className='h-full min-w-26 flex items-center justify-center'>
                <BotaoBase name={bloco.nomeBloco} isSelected = {bloco.siglaBloco === blocoSelecionado}
                  executaAcao={ () => {
                    setBlocoSelecionado(bloco.siglaBloco); 
                    scrollToItem(bloco.id);
                    }} />
              </div>
            ) )}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 z-20 w-8 h-8 p-2 bg-gray-800 bg-opacity-75 text-white rounded-full flex items-center justify-center">
            <ChevronRight size={20}  className='w-full h-full' />
          </button>
        </div>
        <div className='conteudo w-full h-full px-8 flex flex-col overflow-y-auto'>
          <div className='area-vagas w-full flex flex-row justify-between' >
            <div className='esquerda border-y-2 border-l-2'>
              {vacancyNumber.map(
                (item) => blocoSelecionado === item.bloco && !item.right && (
                  <GarageBase isRight = {item.right} numberVacancy={item.number} 
                    clicaNaVaga={() => setOpenModal(!openModal)}
                    children = {
                      <ElementSituation isRight= {item.right} statusVacancy={item.status} /> 
                    } 
                  /> )
              )}
            </div>
            <div className='direita border-y-2 border-r-2'>
              {vacancyNumber.map(
                  (item) => blocoSelecionado === item.bloco && item.right && (
                    <GarageBase isRight = {item.right} numberVacancy={item.number} 
                      children = {
                        <ElementSituation isRight= {item.right} statusVacancy={item.status} /> 
                      } 
                    /> )
              )}
            </div>
          </div>
        </div>
        {openModal && (
            <ModalDownUp />
        )}
        <MenuNavegacao />
      </main>
    </>
  )
}

export default App
