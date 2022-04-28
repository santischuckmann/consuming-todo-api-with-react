import React, { useRef, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Task = ({name, id, deleteTask, editTask, doneness}) => {
  const [isDone, setIsDone] = useState(doneness)

  const handleDoneness = async (id) => {
    if (!isDone) {
      await api.patch(`/${id}`, {name: name, isDone: true})
      setIsDone(true)
    } else {    
      await api.patch(`/${id}`, {name: name, isDone: false})
      setIsDone(false)
    }
  }
  return (
    <div className='task'>
      <div className='nameTasks'>
        <button onClick = {() => handleDoneness(id)} className ="isDone">✅</button>
        <label htmlFor= "checkbox">{isDone ? <strike style = {{"color" : "#555"}}>{name}</strike> : name}</label>
      </div>
        <button onClick = {() => editTask(id)}>Edit</button>
        <button style = {{background: "turquoise"}} onClick = {() => deleteTask(id)}>Delete</button>
    </div>
  )
}

export default Task;