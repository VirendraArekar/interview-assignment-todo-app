import React,{MouseEvent, useEffect, useState} from "react";
import Button from '../Button'
import {RxCross1} from 'react-icons/rx';
import API from "../../hooks/api";
import {  toast } from 'react-toastify';

type ModalProps = {
  show: boolean
  setShow: (params : boolean) =>  void
  setExit : any
  action : String
  id : String
}

export default function Modal({show, setShow, setExit,action, id} : ModalProps) {

  const [todo, setTodo] = useState({
    task : '',
    priority : 1,
    status : 'To Do'
  })

  const [statuses, setStatuses] = useState(['To Do','In Progress','Completed'])
  
  useEffect(() =>{
    getTodoInfo()
  }, [id])

  const getTodoInfo = async() => {
    if(id !== ''){
      let output = await API.get(`/todos/${id}`);
      if(output.status === 200)
      {
        setTodo({...output.data.data})
      }
      else{
        alert(output.data.message)
      }
    }
    else{
      setTodo({
        task : '',
        priority : 1,
        status : 'To Do'
      })
    }
  }


  const submitHandler = async(e : MouseEvent) => {
     if(todo.task === '')
     {
      toast.error('Task is required!');
      return false;
     }
     else if(todo.task.length < 3){
      toast.error('Task should be greater than 2 character long.');
      return false;
     }
     if(todo.status === ''){
      toast.error('Status is required!');
      return false;
     }

     var response = null;

     var payload : object = {
       status : todo.status,
       priority : todo.priority,
       task : todo.task
     }
     if(action === 'Add'){
        response = await API.post('/todos', payload)
     }
     else{
        response = await API.patch(`/todos/${id}`, payload)
     }

     console.log('Status', response.status)
     
     if(response.status === 200){
      toast.success(response.data.message);
      setTimeout(() => {
        setExit()
      }, 500)
     }
     else{
      toast.error(response.data.message)
     }
  }


  
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setTodo({...todo, task : val});
  };


  return (
    <>
      {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-4 max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-slate-800">
                {/*header*/}
                <div className="flex items-start justify-between py-6 px-10 rounded-t">
                  <h5 className="text-xl font-bold dark:text-white">
                    {action} Task
                  </h5>
                  <button
                    className="ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <RxCross1 className="text-gray-900 font-bold dark:text-white" size={25}/>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-10 flex-auto " >
                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 dark:text-white">Task</label>
                        <input 
                        type="email" 
                        id="input-label" 
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter your task"
                        value={todo.task}
                        onChange={inputHandler}
                        />
                   </div>

                   <div className="mb-2">
                       <label htmlFor="input-label" className="block text-md font-medium mb-2 dark:text-white">Priority</label>
                       <button className={`bg-transparen focus:outline-red-600  text-red-600 hover:text-red-800 hover:text-red-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg  font-bold border border-red-600 mr-1 mb-1 ease-linear transition-all duration-150 mx-1 ${todo.priority === 3 ? 'bg-red-200' : ''}`} onClick={() => setTodo({...todo, priority : 3})}>
                          High
                      </button>

                      <button className={`bg-transparen focus:outline-orange-600  text-orange-600 hover:text-orange-800 hover:text-orange-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg  font-bold border border-orange-600 mr-1 mb-1 ease-linear transition-all duration-150 mx-1 ${todo.priority === 2 ? 'bg-orange-200' : ''}`} onClick={() => setTodo({...todo, priority : 2})}>
                          Medium
                      </button>
                      <button className={`bg-transparen focus:outline-green-600  text-green-600 hover:text-green-800 hover:text-green-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg  font-bold border border-green-600 mr-1 mb-1 ease-linear transition-all duration-150 mx-1 ${todo.priority === 1 ? 'bg-green-200' : ''}`} onClick={() => setTodo({...todo, priority : 1})}>
                          Low
                      </button>
                   </div>

                   <div className="mb-2">
                       <label htmlFor="input-label" className="block text-md font-medium mb-2 dark:text-white">Status</label>
                          
                       {/* <button className={`bg-transparen focus:outline-sky-600  text-sky-600 hover:text-sky-800 hover:text-sky-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg  font-bold border border-sky-600 mr-1 mb-1 ease-linear transition-all duration-150 mx-1 bg-sky-200`} onClick={() => setTodo({...todo, status : 'To DO'})} >
                          To Do
                      </button> */}
                       {
                        statuses.map((status, idx) => {
                          return(
                            <button 
                            className={`bg-transparen focus:outline-${idx === 0 ?'sky':(idx === 1 ?'lime':'green')}-600  text-${idx === 0 ?'sky':(idx === 1 ?'lime':'green')}-600 hover:text-${idx === 0 ?'sky':(idx === 1 ?'lime':'green')}-800 hover:text-${idx === 0 ?'sky':(idx === 1?'lime':'green')}-800 text-sm px-8 py-2 rounded-xl shadow hover:shadow-lg  font-bold border border-${idx === 0 ?'sky':(idx === 1?'lime':'green')}-600 mr-1 mb-1 ease-linear transition-all duration-150 mx-1 

                            ${(todo.status === 'To Do' && todo.status === status) ? 'bg-sky-200' : ((todo.status === 'In Progress' && todo.status === status) ? 'bg-lime-200' : ((todo.status === 'Completed' && todo.status === status) ? 'bg-green-200' : 'bg-transparent'))}`} 
                            
                            onClick={() => setTodo({...todo, status : status})} key={idx}>
                                {status}
                            </button>
                          )
                        })
                       }
                       
                   </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6  rounded-b">
                  <Button
                   title={action === 'Add' ? 'Add' : 'Update'} 
                   onClick={submitHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}