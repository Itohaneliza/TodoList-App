import PageTitle from "./Pages/PageTitle";
import AppHeader from "./Pages/AppHeader";
import AppContent from "./Pages/AppContent";
import "./App.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { updateTodo } from "../src/slices/TodoSlice"; // Import the updateTodo action
import TodoModal from "../src/Pages/TodoModal"; // Import the TodoModal component

function App() {
  const toDoList = useSelector((state) => state.todo.todoList);
  const [selectedTask, setSelectedTask] = useState(null);

  const dispatch = useDispatch();

  // Function to update the status of a task
  const updateTaskStatus = (taskId, newStatus) => {
    // Update the status in the Redux store
    dispatch(updateTodo({ id: taskId, status: newStatus }));

    // Update the selected task's status in the state
    setSelectedTask((prevSelectedTask) => ({
      ...prevSelectedTask,
      status: newStatus,
    }));
  };

  return (
    <>
      <div className="Container">
        <PageTitle>TO-DO LIST APP</PageTitle>
        <div className="app__wrapper">
          <AppHeader />
          <AppContent />
        </div>
      </div>

      <Toaster
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />

      {/* Render the TodoModal with the selected task and its status */}
      {selectedTask && (
        <TodoModal
          isOpen={true} // Set this to control modal visibility
          onClose={() => setSelectedTask(null)} // Close the modal when needed
          todo={selectedTask}
        />
      )}
    </>
  );
}

export default App;
