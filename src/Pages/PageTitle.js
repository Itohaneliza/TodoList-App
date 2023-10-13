import React from "react";
import "../Components/tittle.css";

const PageTitle = ({ children, ...rest }) => {
  return (
    <p className="title" {...rest}>
      {children}
    </p>
  );
};

export default PageTitle;
