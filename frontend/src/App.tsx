import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import SearchBar from './components/SearchBar';
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "./hooks/useDarkMode";
import Modal from "./common/Modal"
import Button from './common/Button';
import DeleteModal from './components/DeleteModal';
import Task from './components/Task';
import Loader from './common/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from './hooks/api';
function App() {
   const [task, setTask] = useState<string>("");
   const [keyword, setKeyword] = useState<string>("")
   const [todos, setTodos] = useState([])
   const [loading, setLoading] = useState(false)
   useEffect(() => {
     getTodoList()
   },[])

   const getTodoList = async(task : String = '') => {
      setLoading(true)
      let option = task === '' ? keyword : task;
      let response = await API.get(`/todos${option !== '' ? '?search='+option : ''}`);
      if(response.status === 200){
         setTodos(response.data.data)
      }
      else{
         toast.error(response.data.message)
      }
      setLoading(false)
   }
   const [darkMode, setDarkMode] = useDarkMode();
   const [show, setShow] = useState(false);
   const [open, setOpen] = useState(false);
   const [action, setAction] = useState('')
   const [processId, setProcessId] = useState('');
   
   const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
   };
   

   const handleSubmitTodo = (e: FormEvent) => {
        e.preventDefault();
        setKeyword(task);
        getTodoList(task)
   }

   const handleChange = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setTask(value);
   }

   const clearKeyword = () => {
      setKeyword('');
      setTask('');
      window.location.reload();
   }

   if(loading){
      return <Loader />
   }


   const onExit = () => {
      setShow(false);
      setOpen(false)
      getTodoList()
      // window.location.reload();
   }
  return (
    <div className="App">
        <ToastContainer />
        {
         show &&
         <Modal 
            show={show}
            id={processId}
            setShow={(val) => setShow(val)}
            action={action}
            setExit={onExit}
         />
        }
        
        <DeleteModal
         id={processId}
         open={open}
         setOpen={(val) => setOpen(val)}
         setExit={onExit}
         />
        
        <section className="flex items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
             {/* max-w-md */}
            <div className="max-w-2xl w-full p-3 bg-white dark:bg-slate-800  overflow-hidden sm:rounded-lg space-y-8">
                <div className="flex justify-between ">
                    <h1 className="font-bold dark:text-white text-2xl">Todo List</h1>
                    <Button
                      title={'+ Add'}
                      onClick={() => {
                        setProcessId('')
                        setAction('Add')
                        setShow(true)
                      }}
                    />
                    <DarkModeSwitch
                        style={{ width: '40px', height: '40px' }}
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        size={120}
                    />
                </div>
                <SearchBar 
                     handleSubmitTodo={handleSubmitTodo}
                     handleChange={handleChange}
                     task={task}
                     clearKeyword={clearKeyword}
                />
                <div className=" overflow-x-hidden overflow-y-auto todo-list">
                   <Task 
                   setOpen={(id) => {
                     
                     setProcessId(id)
                     setOpen(true)
                   }}
                   setShow={(id) => {
                     setAction('Edit')
                     setProcessId(id)
                     setShow(true)
                   }}
                   tasks={todos}
                  //  page={todos?.page}
                  //  perPage={todos?.perPage}
                  //  total={todos.total}
                   />
                </div>
            </div>
            <a href="https://github.com/VirendraArekar" target="_blank">
                <p className="text-gray-400 font-medium text-xs mt-3">@VirendraArekar</p>
            </a>
        </section>
    </div>
  );
}

export default App;
