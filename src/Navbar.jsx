import React from 'react'
import {FaCode} from '../node_modules/react-icons/fa'


const Navbar = ({modal, deleteAllTasks}) => {
  return (
    <nav className='navbar'>
      <h2>Manage your tasks</h2>
      <div className='icons'>
        <button onClick = {() => modal()}>Add a task</button>
        <button onClick = {() => deleteAllTasks()}>Delete all tasks</button>
        <a href = "www.github.com/santischuckmann/consuming-todo-api-with-react" rel="noreferrer" target = "_blank"><FaCode className='icon'/></a>
      </div>
    </nav>
  )
}

export default Navbar