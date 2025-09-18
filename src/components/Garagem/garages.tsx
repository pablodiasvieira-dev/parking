import { TStatusVacancy } from '@/api/api';
import { Clock10Icon, LockKeyholeIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface garageProps {
    isRight: boolean;
    children?: ReactNode;
    numberVacancy?: string;
    statusVacancy: TStatusVacancy;
    key?: string
    clicaNaVaga: () => void;
    isSelect: boolean
}

export function GarageBase({isRight, children, numberVacancy, statusVacancy, clicaNaVaga, isSelect}: garageProps) {
    return (
        <>
            <div onClick={clicaNaVaga} className={`garagem-base border-b-2 border-primary-foreground w-32 h-18 relative flex justify-center items-center
                    ${statusVacancy !== "lock" ? 'cursor-pointer' : 'cursor-not-allowed'} ` }>
                <div className={`w-full h-full rounded-md  
                        ${(statusVacancy === "lock" && !isSelect) && 'hover:bg-[repeating-linear-gradient(45deg,var(--secondary)_0_10px,transparent_10px_20px)]' }
                        ${(statusVacancy !== "lock" && !isSelect) && 'hover:border-2 hover:border-primary hover:bg-primary/20 hover:max-w-[90%] hover:max-h-[90%]' }
                        ${isSelect && ('bg-primary max-w-[90%] max-h-[90%]')}`}>
                    <div className='central w-full h-full flex justify-center items-center '>
                        {children}
                    </div>
                    <div className={`absolute text-sm bottom-0 text-black dark:text-primary-foreground ${isRight ? 'left-0' : 'right-0'}`}>
                        {numberVacancy}
                    </div>
                </div>
            </div>
        </>
    )
}

interface ElementSituationProps {
    isRight: boolean;
    statusVacancy?: string;
}

export function ElementSituation(props: ElementSituationProps) {
    return (
        <>
            <div className='item-central mx-7 h-full flex justify-center items-center'>
                {props.statusVacancy === "lock" && (<LockKeyholeIcon className='text-black dark:text-primary-foreground' />)}
                {props.statusVacancy === "use" && (<IconCar isRight = {props.isRight} />)}
                {props.statusVacancy === "reserved" && (<Clock10Icon className='text-black dark:text-primary-foreground'/>)}

            </div>
        </>
    )
}

interface IconCarProps{
    isRight: boolean
}

export function IconCar(props: IconCarProps) {
    return (
        <div>
            <svg height="100%" width="100%" version="1.1" id="Capa_1" className='fill-primary dark:fill-primary-foreground min-h-[72px] min-w-[72px]'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.032 47.032"
                transform={`${props.isRight ? 'matrix(-1, 0, 0, 1, 0, 0)rotate(90)' : 'matrix(-1, 0, 0, 1, 0, 0)rotate(-90)'}`}>
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
        </div>
    )
}
