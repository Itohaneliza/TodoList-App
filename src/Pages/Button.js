import React from "react";
import "../Components/button.css";
import { GetClasses } from "../utils/GetClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, type, variant, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={GetClasses([`button button--${buttonTypes[variant]}`])}
      {...rest}
    >
      {children}
    </button>
  );
};

function SelectButton({ children, ...rest }) {
  return (
    <select className={GetClasses(["button", "button__select"])} {...rest}>
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
