import {MouseEvent, Fragment} from 'react'

type ButtonProps = {
    title: string
    theme ?: string
    onClick: (e: MouseEvent) => void
}
const Button = ({title,theme = 'normal',  onClick} :ButtonProps ) =>{
    return(
        <>
        {
            theme === 'normal' ?
                <button className="bg-violet-500 hover:bg-violet-600   active:bg-violet-700 text-white text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg outline-none  font-bold focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-1" onClick={onClick}>
                        {title}
                </button>
            :   <button className="bg-transparent text-slate-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg outline-none  font-bold border border-slate-400 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-1 dark:text-white" onClick={onClick}>
                        {title}
                </button>
        }
        </>
        
    )
}

export default Button;