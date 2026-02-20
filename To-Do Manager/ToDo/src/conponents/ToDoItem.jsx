import React from 'react';

const ToDoItem = ({ taskname, date, deleteTask }) => {
  return (
    <div className="row my-2">
      <div className="col-6 taskname-row">{taskname}</div>
      <div className="col-4">{date}</div>
      <div className="col-2">
        <button className="btn btn-danger" onClick={deleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;