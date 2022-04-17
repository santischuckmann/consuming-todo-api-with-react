import React from 'react'

const Task = ({name, id, deleteTask}) => {
  return (
    <div className='task'>
      <input type ="checkbox" id = "checkbox"/>
      <label htmlFor= "checkbox">{name}</label>
      <a href="#">Edit</a>
      <button onClick = {() => deleteTask(id)}>Delete</button>
    </div>
  )
}

export default Task