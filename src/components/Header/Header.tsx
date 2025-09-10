import carImage from "../../assets/carDarkCut1.png"
import carImage2 from "../../assets/carDarkCut2.png"

interface IHeader {
    title: string;
    subtitle: string;
}


export function Header(
    { title, subtitle }: IHeader
) {
    return (
        <div className='flex sticky top-0 right-0 w-full h-full bg-primary z-50 shadow-[0px_10px_10px_-1px_rgba(0,_0,_0,_0.25)]' >
            <div className="w-2/3 h-full flex flex-col gap-0 justify-center align-middle pl-8">
                <h1 className='font-bold w-full h-fit text-2xl text-black text-start'>
                    {title}
                </h1>
                <p className='w-full h-full text-start text-secondary font-light text-sm'>{subtitle}</p>
            </div>
            <div className="w-1/3 h-full flex flex-col justify-start items-end">
                <LogoApp />
            </div>
        </div>
    )
}

export function HeaderApp() {
    return (
        <div className='flex flex-col justify-between w-full h-full' >
            <div className="w-full h-3/5 flex flex-col gap-0 justify-center">
                <h2 className='font-light w-full text-4xl text-black text-start'>
                    Bem-vindo ao
                </h2>
                <h1 className='font-bold w-full text-5xl text-black text-start'>
                    Parking App
                </h1>
            </div>
            <LogoAppWelcome />
        </div>
    )
}

export function HeaderEntrada() {
    return (
        <div className='flex justify-between w-full h-full pl-8' >
            <div className="w-2/3 h-full flex flex-col gap-0 justify-center align-middle">
                <h1 className='font-bold w-full h-fit text-3xl text-black text-start'>
                    Parking
                </h1>
            </div>
            <div className="w-1/3 h-full flex  flex-col justify-start items-end ">
                <LogoEntrada />
            </div>
        </div>
    )
}

export function LogoAppWelcome() {
    return (
        <div className="w-full h-2/5 flex justify-center ">
            <div className="border-x-8 border-t-8 rounded-t-sm border-gray-900  w-60 h-full flex justify-center items-end">
                <img src={carImage} alt="Carro Logo do APP" />
            </div>
        </div>
    )
}

export function LogoEntrada() {
    return (
        <div className="w-full h-full pt-8 flex justify-end ">
            <div className="border-l-4 border-t-4 rounded-tl-[4px] border-gray-900 pt-3 w-24 h-full flex justify-end items-end">
                <img className="h-full w-full" src={carImage2} alt="Carro Logo do APP" />
            </div>
        </div>
    )
}

export function LogoApp() {
    return (
        <div className="w-full h-full pt-4 flex justify-end ">
            <div className="border-l-2 border-t-2 rounded-tl-[4px] border-gray-900 pt-2 pl-2 w-16 h-full flex justify-end items-end">
                <img className="h-full w-full" src={carImage2} alt="Carro Logo do APP" />
            </div>
        </div>
    )
}
