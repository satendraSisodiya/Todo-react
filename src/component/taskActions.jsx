import { useState, useEffect } from "react";
import TaskRender from "./taskRender";
import TaskInput from "./taskInput";

export default function Todo() {
  // State hooks for tasks and newTask
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Update newTask value based on input change
  const inputChange = (event) => {
    const inputvalue = event.target.value;
    const formatetext = inputvalue.replace(/\s+/g, " ");
    setNewTask(formatetext);
  };
  // Add new task to the tasks list
  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim() !== "") {
      setTasks([...tasks, { name: newTask, complete: false }]);
      setNewTask("");
    }
  };

  // Store tasks in local storage whenever tasks change
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);
  // Retrieve tasks from local storage on component mount
  useEffect(() => {
    const task = JSON.parse(localStorage.getItem("task"));
    setTasks(task || []);
  }, []);

  // Functions for drag and drop functionality
  const dragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const dragOver = (event, index) => {
    event.preventDefault();
  };

  const drop = (event, dropIndex) => {
    event.preventDefault();
    const dragIndex = event.dataTransfer.getData("index");

    const updatedTasks = [...tasks];
    const draggedTask = updatedTasks[dragIndex];

    updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(dropIndex, 0, draggedTask);

    setTasks(updatedTasks);
  };
  // Mark a task as complete
  const complete = (index) => {
    setTasks((task) => {
      const update = [...task];
      update[index].complete = true;
      return update;
    });
  };
  // Remove completed tasks from the tasks list
  const removeTask = () => {
    const filteredTasks = tasks.filter((task) => !task.complete);
    if(tasks.length===1){
      localStorage.clear()
    }
    setTasks(filteredTasks);
  };
  // Check condition to disable certain controls based on task completion
  const disableCondition = (disableControl) => {
    const disableCondition = tasks.some((task) => {
      return task.complete === true;
    });
    if (!disableCondition) {
      return disableControl;
    }
  };

  return (
    <>
      <div id="main">
        <div className="todoContainer">
          <div>
            <div>
              <div>
                <div className="heading">
                  <h2>DAY-TO-DAY</h2>
                  <h1>TODO LIST</h1>
                </div>
                <TaskInput
                  newTask={newTask}
                  inputChange={inputChange}
                  addTask={addTask}
                  disableCondition={disableCondition}
                  removeTask={removeTask}
                />
                <TaskRender
                  tasks={tasks}
                  dragStart={dragStart}
                  dragOver={dragOver}
                  drop={drop}
                  complete={complete}
                  disableCondition={disableCondition}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
