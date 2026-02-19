import React from 'react'
import ToDoHead from './conponents/ToDoHead'
import ToDoAdd from './conponents/ToDoAdd'
import ToDoitem1 from './conponents/ToDoitem1'
function App() {

  const tasks = [
    { taskname: "going to collage", date: "2024-06-30" },
    { taskname: "Come back from collage", date: "2024-06-30" }
  ]
  return (
    <div className="App">
      <ToDoHead />
      <ToDoAdd />
      <ToDoitem1 tasks={tasks} />
    </div>
  )
}

export default App