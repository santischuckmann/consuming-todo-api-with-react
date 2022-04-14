import React, { useEffect, useState } from 'react'
import Editing from './Editing'
import Task from './Task'
import axios from 'axios';

const Main = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await fetch ("https://to-do-node-mysql.herokuapp.com/api/tasks");
    const data = await response.json()
    setTasks (data)
  }

   useEffect( () => {
    getTasks();
  }, [])


  return (
    <div className = "to_do_list_container">
      <h1>To-Do List</h1>
      {tasks.tasks.map((task) => {
        return <Task key = {task.id} name = {task.name}></Task>
      })}
      <div className = "main_input">
      <input type ="text"></input>
      <button>Add</button>
      </div>
      <Editing />
    </div>
  )
}

export default Main