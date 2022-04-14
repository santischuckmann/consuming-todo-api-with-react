import React from 'react'

const Task = (props) => {
  return (
    <div className='task'>
      <input type ="checkbox" id = "checkbox"/>
      <label htmlFor= "checkbox">{props.name}</label>
      <a href="#">Edit</a>
    </div>
  )
}

export default Task