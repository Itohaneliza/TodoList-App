import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { addTodo, updateTodo } from "../slices/TodoSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import "../Components/todomodal.css";
import notificationSoundUrl from "../sound/notification-interface-success-positive-corrects-132471.mp3";

const TodoModal = ({ isOpen, onClose, todo, status: externalStatus }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Incomplete"); // Initialize with 'Incomplete' status

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("Incomplete");
    }
  }, [todo]);

  useEffect(() => {
    // Update the status in the local state when the externalStatus prop changes
    if (externalStatus) {
      setStatus(externalStatus);
    }
  }, [externalStatus]);

  const handleStatusChange = (e) => {
    // Update the status state based on the selected value
    const selectedStatus = e.target.value;

    // Check if the selected status is "Complete"
    if (selectedStatus === "Complete") {
      // If it's "Complete," set the status to "Complete"
      setStatus("Complete");
    } else {
      // If it's not "Complete," set the status to "Incomplete"
      setStatus("Incomplete");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      if (todo) {
        dispatch(
          updateTodo({
            id: todo.id,
            title,
            status,
          })
        );

        // Play the notification sound
        const audio = new Audio(notificationSoundUrl);
        audio.play();

        toast.success("Task Updated Successfully");
      } else {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleDateString(),
          })
        );

        // Play the notification sound
        const audio = new Audio(notificationSoundUrl);
        audio.play();

        toast.success("Task Added Successfully");
      }
      if (typeof onClose === "function") {
        onClose(); // Close the modal after adding or editing a task
      }
    } else {
      toast.error("Title shouldn't be empty");
    }
  };

  return (
    <div className={`wrapper ${isOpen ? "open" : ""}`}>
      <div className="container">
        <div className="closeButton" onClick={onClose} role="button">
          <MdOutlineClose />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="formTitle">{todo ? "Edit Task" : "Add Task"}</h1>
          <label htmlFor="title">
            Title
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
          </label>

          <label htmlFor="status">
            Status
            <select
              name="status"
              id="status"
              value={status}
              onChange={handleStatusChange} // Use the handleStatusChange function
            >
              <option value="Incomplete">Incomplete</option>
              <option value="Complete">Complete</option>
            </select>
          </label>
          <div className="buttonContainer">
            <Button type="submit" variant="primary">
              {todo ? "Update Task" : "Add Task"}
            </Button>

            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
