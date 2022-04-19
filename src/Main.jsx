import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import axios from 'axios';

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Main = () => {
  const [manageEdition, setManageEdition] = useState({state: false, editName: "", editId: 0});
  const [tasks, setTasks] = useState([]);
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
    const name =  {name: taskName.current.value}
    await api.post('/', name)
    setTasks([...tasks, name])
    taskName.current.value = ""
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
    // await api.patch(`/${id}`, {name: newEditedName})
    const clonedTasks = tasks
    const indexOfTask = clonedTasks.findIndex(task => task.id === id)
    console.log(indexOfTask)
    clonedTasks[indexOfTask] = {...taskAboutToEdit}
    console.log(clonedTasks[indexOfTask])
    clonedTasks[indexOfTask].name = updatedTaskName.current.value;
    setTasks(clonedTasks)
    updatedTaskName.current.value = "";
    setManageEdition({state: false, editName: "", editId: 0})
  }

   useEffect(() => {
    getTasks();
  }, [])


  return (
    <div className = "to_do_list_container">
      <h1>To-Do List</h1>
      {tasks.map((task) => {
        return <Task key = {task.id} name = {task.name} deleteTask = {deleteTask} editTask = {editTask} {...task}></Task>
      })}
      <div className = "main_input">
      <input type ="text" ref ={taskName}></input>
      <button onClick={addTask}>Add</button>
      </div>
      {manageEdition.state && 
      <div className='editing_task'>
        <h2>Editing task "{manageEdition.editName}" de id {manageEdition.editId}</h2>
        <input type="text" ref = {updatedTaskName}></input>
        <div className='editing_task_buttons'> 
          <button onClick = {() => updateTask(manageEdition.editId)}>Save</button>
          <button>Cancel</button>
        </div>
      </div>}
    </div>
  )
}

export default Main