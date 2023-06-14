import React from 'react';
import {FormEvent, ChangeEvent} from 'react'
import {RxCross2} from 'react-icons/rx'
type AddTodoProps = {
    task: string
    handleSubmitTodo: (e: FormEvent) => void
    handleChange: (e: ChangeEvent) => void
    clearKeyword : (e: FormEvent) => void
}



export default function SearchBar({handleSubmitTodo, task, handleChange, clearKeyword}:AddTodoProps) {
  return (
    <form onSubmit={() => {}} className="flex relative justify-center items-center">
            <input placeholder="Enter new task" className=" h-12 px-3 py-2 bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block w-full rounded-tl-2xl rounded-bl-2xl sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" id="add-todo" type="text" name="task" value={task} onChange={handleChange} />
            <RxCross2 
             className={`${task.length > 0 ? 'visible' : 'invisible'} absolute right-24 my-auto cursor-pointer`} size={25}
             onClick={clearKeyword}
            />
            <button type="submit"
                    aria-label="Add todo"
                    className="h-12 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-tr-2xl rounded-br-2xl font-bold text-white"
              onClick={handleSubmitTodo}
            >
                Search
            </button>
        </form>
  )
}
