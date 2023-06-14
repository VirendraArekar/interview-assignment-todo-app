import React,{memo} from 'react'
import {HiOutlinePencilAlt, HiOutlineTrash} from 'react-icons/hi'

type TaskProps = {
    setShow: (params : any) =>  void
    setOpen: (params : any) =>  void
    tasks : Array<any>
    // page : number,
    // perPage : number,
    // total : number
}

function Task({setShow, setOpen ,tasks} : TaskProps) {

  return (
    <>
    {
        tasks.length > 0 ?
        tasks.map((item, index) => {
            return(
                <div 
                  className='flex justify-between items-center border rounded-3xl  px-6 py-3 shadow dark:border-white relative mb-2'
                  key={index}
                >
                    <div className="flex flex-col " style={{width : '30%'}}>
                        <span className="text-gray-400 dark:text-white leading-none ">Task</span>
                        <span className="font-semibold text-lg text-gray-800 dark:text-white ">{item.task}</span>
                    </div>
                    <div className="flex flex-col " style={{width : '20%'}}>
                        <span className="text-gray-500 dark:text-white">Priority</span>
                        <span className={`font-semibold text-lg ${item.priority === 1 ? 'text-emerald-400' : (item.priority === 2 ? 'text-orange-400' : 'text-red-600')} `}>
                            {item.priority === 1 ? 'Low' : (item.priority === 2 ? 'Medium' : 'High')}
                        </span>
                    </div>
                    <div className="flex flex-col" >
                        <span 
                        className="text-gray-500 dark:text-white px-4 py-0 border rounded-md bg-gray-100 dark:bg-gray-900  text-sm dark:text-gray-200">
                            {item.status}
                        </span>
                    </div>
                    <div className={`invisible md:visible ${item.status === 'To Do' ? 'todo-progress-bar' : (item.status === 'In Progress' ? 'progress-bar' : 'complete-progress-bar')}`} ></div>
                    <div className="flex flex-row">
                        <HiOutlinePencilAlt 
                        size={25} 
                        className="mr-2 cursor-pointer text-gray-600 dark:text-white"
                        onClick={() => setShow(item._id)}
                        />
                        <HiOutlineTrash 
                        size={25} 
                        className="cursor-pointer text-red-500"
                        onClick={() => setOpen(item._id)}
                        />
                    </div>
            </div>
            )
        })
        : null
    }
    </>
  )
}

export default  memo(Task)
