import React from "react";

function TaskInput({
  inputChange,
  newTask,
  addTask,
  disableCondition,
  removeTask,
}) {
  return (
    <form className="inputBtn" onSubmit={addTask}>
      <input
        className="input"
        type="text"
        placeholder=" Enter your task"
        value={newTask}
        onChange={(event) => inputChange(event)}
      />
      <button className="button addBtn" type="submit">
        Add
      </button>
      <button
        className="button deleteBtn"
        type="submit"
        onClick={removeTask}
        disabled={disableCondition("disable")}
      >
        Delete
      </button>
    </form>
  );
}
export default TaskInput;
