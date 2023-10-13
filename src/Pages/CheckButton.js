import React, { useState } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi"; // Import the correct icons
import { motion } from "framer-motion";

const boxVariants = {
  checked: {
    background: "var(--primaryPurple)",
    transition: { duration: 0.1 },
  },
  unchecked: {
    background: "var(--gray-1)",
    transition: { duration: 0.1 },
  },
};

const CheckButton = ({ checked: initialChecked, handleCheck }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleToggleCheck = () => {
    setChecked(!checked);
    handleCheck(!checked); // Notify the parent component about the change
  };

  return (
    <motion.div
      className="svgBox"
      variants={boxVariants}
      initial={checked ? "checked" : "unchecked"}
      animate={checked ? "checked" : "unchecked"}
      onClick={handleToggleCheck}
      onKeyDown={handleToggleCheck}
      role="button"
      tabIndex={0}
    >
      {checked ? (
        <FiCheckSquare className="motion-svg" />
      ) : (
        <FiSquare className="motion-svg" />
      )}
    </motion.div>
  );
};

export default CheckButton;
