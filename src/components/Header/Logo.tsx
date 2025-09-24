import carImage from "../../assets/carDarkCut1.png"
import carImage2 from "../../assets/carDarkCut2.png"
// import carImage3 from "../../assets/carRotateWhiteCut2.png"
import carImage4 from "../../assets/carOrangeCut3.png"
// import carImage5 from "../../assets/carWhiteCut3.png"

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
        <div className="w-full h-full pt-4 flex justify-end  z-60">
            <div className="border-l-2 border-t-2 rounded-tl-[4px] border-gray-900 pt-2 pl-2 w-16 h-full flex justify-end items-end">
                <img className="h-full w-full " src={carImage2} alt="Carro Logo do APP" />
            </div>
        </div>
    )
}
export function LogoAppEsquerdo() {
    return (
        <div className="w-full max-w-16 h-[80%] flex justify-center z-60">
            <div className="border-r-2 border-y-2 rounded-r-[4px] border-primary  w-full h-full
                flex justify-start items-center pr-2">
                <img className="dark:hidden h-[90%] w-full " src={carImage4} alt="Carro Logo do APP" />
                <img className="hidden dark:block h-[90%] w-full" src={carImage4} alt="Carro Logo do APP" />
            </div>
        </div>
    )
}
