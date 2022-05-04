import React from 'react'
import {FaCode} from '../node_modules/react-icons/fa'


const Navbar = () => {
  return (
    <nav className='navbar'>
      <h2>Manage your tasks</h2>
      <div className='icons'>
        <button>Add a task</button>
        <button>Delete all tasks</button>
        <a><FaCode className='icon'/></a>
      </div>
    </nav>
  )
}

export default Navbar