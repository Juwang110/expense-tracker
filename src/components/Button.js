import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ value, link }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    console.log("navigating");
    navigate(link);
  };

  return <button onClick={navigateTo}>{value}</button>;
}

export default Button;
