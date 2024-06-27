import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

function NavButton({ value, link }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    console.log("navigating");
    navigate(link);
  };

  return (
    <Button onClick={navigateTo} color="blue">
      {value}
    </Button>
  );
}

export default NavButton;
