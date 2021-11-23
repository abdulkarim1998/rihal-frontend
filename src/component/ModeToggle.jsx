import React from "react";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import { IconButton } from "@material-ui/core";

function ModeToggle({ mode, setMode }) {
  const toggleMode = () => {
    const typeOfMode = mode === "light" ? "dark" : "light";
    setMode(typeOfMode);
    localStorage.setItem("mode", typeOfMode);
  };
  return (
    <IconButton onClick={toggleMode}>
      {mode === "light" ? (
        <Brightness2Icon style={{ color: "#0e3b8c", fontSize: 40 }} />
      ) : (
        <Brightness5Icon style={{ color: "#e3be19", fontSize: 40 }} />
      )}
    </IconButton>
  );
}

export default ModeToggle;
