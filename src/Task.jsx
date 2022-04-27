import React, { useRef, useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: `https://to-do-node-mysql.herokuapp.com/api/tasks`
})

const Task = ({name, id, deleteTask, editTask, doneness}) => {
  const [isDone, setIsDone] = useState(doneness);
  const checkbox = useRef();

  const handleCheckbox = async (id) => {
    if (checkbox.checked) {
      await api.patch(`/${id}`, {name: name, isDone: false})
      setIsDone(false);
    } else {
      await api.patch(`/${id}`, {name: name, isDone: true})
      setIsDone(true);
    }
  }
  return (
    <div className='task'>
      <div className='nameTasks'>
        <input onClick ={() => handleCheckbox(id)} ref = {checkbox} type ="checkbox" id = "checkbox" checked = {isDone}/>
        <label htmlFor= "checkbox">{name}</label>
      </div>
        <button onClick = {() => editTask(id)}>Edit</button>
        <button style = {{background: "turquoise"}} onClick = {() => deleteTask(id)}>Delete</button>
    </div>
  )
}

export default Task