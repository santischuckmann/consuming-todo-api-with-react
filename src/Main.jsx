import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import axios from 'axios';
import Navbar from './Navbar';
import Spinner from './Spinner'

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Main = () => {
  const [manageEdition, setManageEdition] = useState({
    modalOpened: false, 
    editId: 0,
    previousInput: ''
  });
  const [ isLoading, setIsLoading ] = useState(true)
  const [tasks, setTasks] = useState([]);
  const [isModalOpened, setIsModalOpened] = useState(false)
  const taskName = useRef();
  const updatedTaskName = useRef();

  const getTasks = async () => {
    try {
      const response = await api.get('/');
      setTasks(response.data.tasks)
      console.log(response.data.tasks)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
      } else {
        console.log(`Error: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const openModalFromAnotherComponent = () => setIsModalOpened(true)

  const addTask = async () => {
    const checkingNullString = taskName.current.value ? taskName.current.value : "New task";
    const name =  {name: checkingNullString}
    setTasks((prev) => [...prev, name])
    taskName.current.value = ""
    setIsModalOpened(false)
    await api.post('/', name)
  }

  const deleteAllTasks = async () => {
    await api.delete('/')
    setTasks([])
  }

  const deleteTask = async (id) => {
    const newTasks = tasks.filter((task) => {
      return task.id !== id
      
    })
    setTasks(newTasks)
    await api.delete(`/${id}`)
  }

  const editTask = (id) => {
    const taskAboutToEdit = tasks.find(task => task.id === id)
    setManageEdition({modalOpened: true, previousInput: taskAboutToEdit.name, editId: id})
  }

  const updateTask = async (id) => {
    const taskAboutToEdit = tasks.find(task => task.id === id)
    let newEditedName = updatedTaskName.current.value;
    const checkingNullString = newEditedName ? newEditedName : taskAboutToEdit.name;
    const clonedTasks = tasks
    const indexOfTask = clonedTasks.findIndex(task => task.id === id)
    clonedTasks[indexOfTask] = {...taskAboutToEdit}
    clonedTasks[indexOfTask].name =  checkingNullString;
    setTasks(clonedTasks)
    updatedTaskName.current.value = "";
    setManageEdition({modalOpened: false, editId: 0})
    await api.patch(`/${id}`, {name: checkingNullString})
  }

   useEffect(() => {
    getTasks();
  }, [])


  return (
    <>
    <Navbar modal = {openModalFromAnotherComponent}
    deleteAllTasks = {deleteAllTasks} />
    <div className = "to_do_list_container" data-modal-dismiss = "add-task-modal">
      <h1>Your tasks</h1>
      <div className='tasks'>
      {isLoading && <Spinner />}
      {tasks.map((task) => {
        return <Task key = {task.id} name = {task.name} deleteTask = {deleteTask} editTask = {editTask} {...task} doneness = {task.isDone}></Task>
      })}
      </div>
      <dialog className = 'add_task_modal' open = {isModalOpened}>
        <h2>Add a task!</h2>
        <input type = "text" className = "add_task_input" ref = {taskName}></input>
        <button onClick={addTask}>Confirm</button>
        <button className="close_modal" onClick={() => setIsModalOpened(false)}>Close modal</button>
      </dialog>
      <dialog className = 'add_task_modal' open = {manageEdition.modalOpened}>
        <h2>Edit a task!</h2>
        <input 
        className = "add_task_input" 
        ref = {updatedTaskName}
        value= {manageEdition.previousInput} />
        <button onClick={() => updateTask (manageEdition.editId)}>Confirm</button>
        <button className="close_modal" onClick={() => setManageEdition({modalOpened: false})}>Close modal</button>
      </dialog>
    </div>
    </>
  )
}

export default Main;
