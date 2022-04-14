import React from 'react'

const Task = ({name}) => {
  return (
    <div className='task'>
      <input type ="checkbox" id = "checkbox"/>
      <label htmlFor= "checkbox">{name}</label>
      <a href="#">Edit</a>
    </div>
  )
}

export default Task