import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/TodoSlice";
import { format } from "date-fns";
import CheckButton from "../Pages/CheckButton";
import "../Components/item.css";
import TodoModal from "../Pages/TodoModal";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [todo]);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const formattedTime = format(new Date(todo.time), "yyyy-MM-dd hh:mm a");

  const handleCheck = (checked) => {
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "complete" : "incomplete",
      })
    );
  };

  return (
    <div className="item">
      <div className="todoDetails">
        <CheckButton
          checked={todo.status === "complete"}
          handleCheck={handleCheck}
        />
        <div className="texts">
          <p
            className={`todoText ${
              todo.status === "complete" ? "todoText--completed" : ""
            }`}
          >
            {todo.title}
          </p>
          <p className="time">{formattedTime}</p>
        </div>
      </div>
      <div className="todoActions">
        <div
          className="icon"
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          <MdDeleteForever />
        </div>
        <div
          className="icon"
          onClick={handleEdit}
          onKeyDown={handleEdit}
          role="button"
          tabIndex={0}
        >
          <AiTwotoneEdit />
        </div>
      </div>
      {isModalOpen && (
        <TodoModal isOpen={isModalOpen} onClose={closeEditModal} todo={todo} />
      )}
    </div>
  );
};

export default TodoItem;
