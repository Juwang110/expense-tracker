import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

// Simple button component with react router dom navigation given a button text value and link to page
function NavButton({ value, link }) {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(link);
  };

  return (
    <Button onClick={navigateTo} color="blue">
      {value}
    </Button>
  );
}

export default NavButton;
