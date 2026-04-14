import ToDoItem from './ToDoItem';

const ToDoitems = ({ tasks, deleteTask }) => {
  return (
    <>
      {tasks.map((taskitem, index) => (
        <ToDoItem
          key={index}
          taskname={taskitem.taskname}
          date={taskitem.date}
          deleteTask={() => deleteTask(index)}
        />
      ))}
    </>
  );
};

export default ToDoitems;