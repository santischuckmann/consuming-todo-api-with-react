import React from 'react'

const Task = ({name, id, deleteTask, editTask}) => {
  return (
    <div className='task'>
      <div className='nameTasks'>
        <input type ="checkbox" id = "checkbox"/>
        <label htmlFor= "checkbox">{name}</label>
      </div>
        <button onClick = {() => editTask(id)}>Edit</button>
        <button style = {{background: "turquoise"}} onClick = {() => deleteTask(id)}>Delete</button>
    </div>
  )
}

export default Task