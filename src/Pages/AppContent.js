import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import "../Components/appcontent.css";

const AppContent = () => {
  const toDoList = useSelector((state) => state.todo.todoList);

  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

  // Sort tasks by date in descending order (most recent first)
  const sortedTodoList = [...toDoList].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  let filteredTodoList = sortedTodoList;

  if (initialFilterStatus === "complete") {
    filteredTodoList = sortedTodoList.filter(
      (item) => item.status === "Complete"
    );
  } else if (initialFilterStatus === "incomplete") {
    filteredTodoList = sortedTodoList.filter(
      (item) => item.status !== "Complete"
    );
  }

  return (
    <div className="content__wrapper">
      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p className="notask">No task(s) found.</p>
      )}
    </div>
  );
};

export default AppContent;
