import React, { useState } from "react";
import ToDoHead from "./conponents/ToDoHead";
import ToDoAdd from "./conponents/ToDoAdd";
import ToDoitems from "./conponents/ToDoitems";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([
    { taskname: "going to collage", date: "2024-06-30" },
    { taskname: "Come back from collage", date: "2024-06-30" },
  ]);

  
  const addTask = (taskname, date) => {
    if (!taskname || !date) {
      toast.error("Please enter task and date!");
      return;
    }
    const newTask = { taskname, date };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    toast.warning("Task is completed!");
  };

  return (
    <div className="App">
      <ToDoHead />
      <ToDoAdd addTask={addTask} />
      <ToDoitems tasks={tasks} deleteTask={deleteTask} />
      <ToastContainer position="top-left" autoClose={1000} />
    </div>
  );
}

export default App;