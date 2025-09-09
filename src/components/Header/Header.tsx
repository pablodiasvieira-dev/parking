interface IHeader {
    title: string;
    subtitle: string;
}


export function Header(
    { title, subtitle}: IHeader
) {
    return (
        <header>
            <div className='cabecalho-geral flex flex-col items-start sticky top-0 right-0 w-full h-20 bg-gray-900  z-50 px-8 py-2 shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]' >
                <span className='font-bold w-fit h-full text-3xl text-amber-400 content-center'>
                    {title}
                </span>
                <p className='w-fit h-full text-amber-50 font-light '>{subtitle}</p>
            </div>
        </header>
    )
}
