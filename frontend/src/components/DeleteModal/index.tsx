import React,{MouseEvent} from "react";
import Button from "../../common/Button";
import {RxCross1} from 'react-icons/rx'
import API from "../../hooks/api";
import { toast } from "react-toastify";

type ModalProps = {
  id : string
  open: boolean
  setOpen: (params : boolean) =>  void
  setExit : any
}

export default function DeleteModal({id, open, setOpen, setExit} : ModalProps) {

  const submitHandler = async(e : MouseEvent) => {
    let response = await API.delete(`/todos/${id}`)
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
  return (
    <>
      {open ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-4 max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-slate-800">
                {/*header*/}
                <div className="flex items-start justify-between pt-6 px-10 rounded-t">

                  <button
                    className="ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 className="text-gray-900 dark:text-white font-bold" size={25}/>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-10 flex-auto" style={{width : 400}}>
                    <div className=" flex flex-col text-slate-800 dark:text-white text-2xl leading-relaxed text-center  font-bold">
                        <span>Are you sure you want to</span>
                        <span>delete this task</span>
                 
                  </div>
                   
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6  rounded-b">
                  <Button
                   title={'Delete'} 
                   theme={'normal'}
                   onClick={submitHandler}
                  />
                  <Button
                   title={'Cancel'} 
                   theme={'blank'}
                   onClick={(e) => {
                     setOpen(false)
                   }}
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