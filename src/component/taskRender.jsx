import React from "react";

function TaskRender({ tasks, dragStart, dragOver, drop, complete }) {
  return (
    <ul className="taskContainer">
      {/* Empty Task container */}
      {tasks.length === 0 && (
        <li className="empty">
          <h2> YOUR TASK LIST IS EMPTY </h2>
        </li>
      )}
      {/* Task List Container  */}
      {tasks.length !== 0 &&
        tasks.map((task, index) => (
          <li
            className={`taskList ${task.complete ? "complete" : ""}`}
            key={index}
            draggable={task.complete ? false : true}
            onDragStart={(event) => dragStart(event, index)}
            onDragOver={(event) => dragOver(event, index)}
            onDrop={(event) => drop(event, index)}
          >
            <span className="DND">
              <span className="minus"></span>
              <span className="minus"></span>
              <span className="minus"></span>
            </span>
            <span className="taskname">{task.name}</span>
            <span className="check">
              <input
                type="checkbox"
                name="completed"
                checked={task.complete}
                style={{ cursor: "pointer" }}
                onChange={() => complete(index)}
                disabled={task.complete ? "disabled" : ""}
              />
            </span>
          </li>
        ))}
    </ul>
  );
}
export default TaskRender;
