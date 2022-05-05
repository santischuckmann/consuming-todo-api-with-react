import React from 'react'
import {FaCode} from '../node_modules/react-icons/fa'


const Navbar = ({modal}) => {
  return (
    <nav className='navbar'>
      <h2>Manage your tasks</h2>
      <div className='icons'>
        <button onClick = {() => modal("add")}>Add a task</button>
        <button onClick = {() => modal("edit")}>Delete all tasks</button>
        <a href = "www.github.com/santischuckmann/consuming-todo-api-with-react" rel="noreferrer" target = "_blank"><FaCode className='icon'/></a>
      </div>
    </nav>
  )
}

export default Navbar