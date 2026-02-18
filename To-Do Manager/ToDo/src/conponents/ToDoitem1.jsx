import React from 'react'

const ToDoitem1 = () => {

  let task = "going to collage"

  return (
     <div className="container text-center">
  
  <div className="row">
    <div className="col-6">
     {task}
    </div>
    <div className="col-4">
      2024-06-30
    </div>
    <div className="col-2">
      <button className="btn btn-danger">Delete </button>
    </div>
  </div>

  <div className="row">
    <div className="col-6">
     Come back from collage 
    </div>
    <div className="col-4">
      2024-06-30
    </div>
    <div className="col-2">
      <button className="btn btn-danger">Delete </button>
    </div>
  </div>
</div>
  )
}

export default ToDoitem1;