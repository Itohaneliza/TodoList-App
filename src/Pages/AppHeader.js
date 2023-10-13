import React, { useState } from "react";
import Button from "../Pages/Button";
import SelectButton from "../Pages/Button";
import TodoModal from "../Pages/TodoModal";
import "../Components/appheader.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/TodoSlice";

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

  const [filter] = useState(initialFilterStatus);

  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  const handleAddTaskClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="appHeader">
      <Button variant="primary" onClick={handleAddTaskClick}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        value={filter}
        onChange={(e) => updateFilter(e)}
      >
        <select className="select">
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </SelectButton>
      {modalOpen && <TodoModal isOpen={modalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default AppHeader;
