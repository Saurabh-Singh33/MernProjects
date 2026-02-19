
import ToDoItem from './ToDoItem'

const ToDoitems = ({ tasks }) => {
  return (
    <>
    {tasks.map((taskitem)=>{
      return(
      
      <ToDoItem taskname={taskitem.taskname} date={taskitem.date} />
    
      )
    })}
    </>
  
  )
}

export default ToDoitems
