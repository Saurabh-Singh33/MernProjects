import React, { useState } from 'react';

const ToDoAdd = ({ addTask }) => {
  const [taskname, setTaskname] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    addTask(taskname, date);
    setTaskname(""); 
    setDate("");
  };

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            value={taskname}
            onChange={(e) => setTaskname(e.target.value)}
          />
        </div>
        <div className="col-4">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoAdd;