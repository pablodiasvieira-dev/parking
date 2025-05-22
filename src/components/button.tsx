
interface buttonProps {
    key?: string;
    name: string;
    executaAcao?: () => void
    isSelected?: boolean
    // useSpinner?: boolean
}
export function BotaoBase(props: buttonProps) {
    return (
        <>
        <div className={`w-full h-full min-h-6 min-w-26 max-h-10
            rounded-full items-center ${props.isSelected ? 'bg-amber-700 hover:bg-amber-800 ' : 'bg-amber-50 hover:bg-amber-300' }
            focus:ring-4 focus:outline-none focus:ring-amber-300`}>
            <button 
                type= 'button'
                className={`content-center h-full w-full text-[14px] cursor-pointer ${props.isSelected ? 
                    'text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-300':
                    'text-amber-700 bg-amber-50 hover:bg-amber-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-amber-300' } 
                    font-medium rounded-full text-center `}
                onClick={props.executaAcao} >
                    {props.name}
            </button>
        </div>
        </>
    )
}

export function BotaoTipoInicial(props: buttonProps){
    return (
        <div className="w-2/3 h-full bg-amber-700 hover:bg-amber-800 rounded-tr-2xl rounded-bl-2xl">
            <button 
                type= 'button'
                className={`content-center h-full w-full text-xl text-center text-white font-medium
                    bg-amber-700 hover:border-4 hover:border-amber-200 focus:outline-none focus:ring-4 focus:ring-amber-300 cursor-pointer
                    rounded-tr-2xl rounded-bl-2xl pl-2`}
                onClick={props.executaAcao} >
                    {props.name}
            </button>
        </div>
    )
}
