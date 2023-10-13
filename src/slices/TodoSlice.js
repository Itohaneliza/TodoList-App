import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem("todoList");
  if (localTodoList) {
    // If localTodoList exists in localStorage, parse and return it
    return JSON.parse(localTodoList);
  } else {
    // If localTodoList doesn't exist in localStorage, initialize it with an empty array
    const initialTodoList = [];
    window.localStorage.setItem("todoList", JSON.stringify(initialTodoList));
    return initialTodoList;
  }
};

const initialState = {
  filterStatus: "all",
  todoList: getInitialTodo(),
};

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        time: new Date().toLocaleString(), // Include current date and time
      };
      // Use the spread operator to create a new array with the added todo
      state.todoList = [...state.todoList, newTodo];
      // Update localStorage separately
      window.localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },
    updateTodo: (state, action) => {
      // Find the index of the todo to update
      const index = state.todoList.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        // Update the todo if it exists
        state.todoList[index] = {
          ...action.payload,
          time: new Date().toLocaleString(),
        };
        // Update localStorage separately
        window.localStorage.setItem("todoList", JSON.stringify(state.todoList));
      }
    },
    deleteTodo: (state, action) => {
      // Use filter to create a new array without the deleted todo
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
      // Update localStorage separately
      window.localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },
    updateFilterStatus: (state, action) => {
      // Return a new state object with the updated filterStatus
      return {
        ...state,
        filterStatus: action.payload,
      };
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  TodoSlice.actions;
export default TodoSlice.reducer;
