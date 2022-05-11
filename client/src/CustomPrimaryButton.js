import React from "react";
import {Button} from '@material-ui/core';
const Button1 = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    <Button>
      variant="contained"
      sx={{
        bgcolor: "#5865F2",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        width: "100%",
        height: "40px",
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    
      label={label}
    </Button>
  );
};

export default Button1;
