import React from 'react'

const ToDoAdd = () => {
  return (
    <center className='ToDo-Container'>
      <div className="container text-center">
  
  <div className="row">
    <div className="col-6">
  <input type="text" className="form-control" placeholder="Add a new task" Placeholder="Add Some task" />
    </div>
    <div className="col-4">
      <input type='date' className="form-control"></input>
    </div>
    <div className="col-2">
      <button className="btn btn-primary">Add Task</button>
    </div>
  </div>
</div>
    </center>
  )
}

export default ToDoAdd