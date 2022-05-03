import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import axios from 'axios';

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Main = () => {
  const [manageEdition, setManageEdition] = useState({state: false, editName: "", editId: 0});
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
    }
  }

  const addTask = async () => {
    const checkingNullString = taskName.current.value ? taskName.current.value : "New task";
    const name =  {name: checkingNullString}
    await api.post('/', name)
    setTasks([...tasks, name])
    taskName.current.value = ""
    setIsModalOpened(false)
  }

  const deleteTask = async (id) => {
    await api.delete(`/${id}`)
    const newTasks = tasks.filter((task) => {
      return task.id !== id
      
    })
    setTasks(newTasks)
  }

  const editTask = (id) => {
    const taskAboutToEdit = tasks.find((task) => {
      return task.id === id
    })
    setManageEdition({state: true, editName: taskAboutToEdit.name, editId: id})
  }

  const updateTask = async (id) => {
    const taskAboutToEdit = tasks.find((task) => {
      return task.id === id
    })
    let newEditedName = updatedTaskName.current.value;
    const checkingNullString = newEditedName ? newEditedName : "Updated but not named";
    await api.patch(`/${id}`, {name: checkingNullString})
    const clonedTasks = tasks
    const indexOfTask = clonedTasks.findIndex(task => task.id === id)
    console.log(indexOfTask)
    clonedTasks[indexOfTask] = {...taskAboutToEdit}
    console.log(clonedTasks[indexOfTask])
    clonedTasks[indexOfTask].name =  checkingNullString;
    setTasks(clonedTasks)
    updatedTaskName.current.value = "";
    setManageEdition({state: false, editName: "", editId: 0})
  }

   useEffect(() => {
    getTasks();
  }, [])


  return (
    <div className = "to_do_list_container" data-modal-dismiss = "add-task-modal">
      <h1>Your tasks</h1>
      <div className='tasks'>
      {tasks.map((task) => {
        return <Task key = {task.id} name = {task.name} deleteTask = {deleteTask} editTask = {editTask} {...task} doneness = {task.isDone}></Task>
      })}
      </div>
      <button className = 'add_button' onClick={() => setIsModalOpened(true)} >Add</button>
      <dialog className = 'add_task_modal' open = {isModalOpened}>
        <h2>Add a task!</h2>
        <input className = "add_task_input" ref = {taskName}></input>
        <button onClick={addTask}>Confirm</button>
        <button className="close_modal" onClick={() => setIsModalOpened(false)}>Close modal</button>
      </dialog>
      {manageEdition.state && 
      <div className='editing_task'>
        <h2>Editing task "{manageEdition.editName}"</h2>
        <input type="text" ref = {updatedTaskName}></input>
        <div className='editing_task_buttons'> 
          <button onClick = {() => updateTask(manageEdition.editId)}>Save</button>
          <button onClick = {() => setManageEdition({state: false})}> Cancel</button>
        </div>
      </div>}
    </div>
  )
}

export default Main