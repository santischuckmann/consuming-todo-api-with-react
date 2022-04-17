import React, { useEffect, useRef, useState } from 'react'
import Editing from './Editing'
import Task from './Task'
import axios from 'axios';

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Main = () => {
  const [showEdit, setShowEdit] = useState(false);
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
      if (task.id !== id) {
        return task
      }
    })
    setTasks(newTasks)
  }

  const updateTask = async (id) => {
    const name = {name: updatedTaskName.current.value}
    await api.patch(`/${id}`, )
  }

   useEffect(() => {
    getTasks();
  }, [])


  return (
    <div className = "to_do_list_container">
      <h1>To-Do List</h1>
      {tasks.map((task) => {
        return <Task key = {task.id} name = {task.name} deleteTask = {deleteTask} {...task}></Task>
      })}
      <div className = "main_input">
      <input type ="text" ref ={taskName}></input>
      <button onClick={addTask}>Add</button>
      </div>
      <Editing />
    </div>
  )
}

export default Main