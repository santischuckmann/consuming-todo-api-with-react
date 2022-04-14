import React from 'react'

const Editing = () => {
  return (
    <div className='editing_task'>
      <h2>Editing task</h2>
      <input type="text"></input>
      <div className='editing_task_buttons'> 
      <button>Save</button>
      <button>Cancel</button>
      </div>
    </div>
  )
}

export default Editing