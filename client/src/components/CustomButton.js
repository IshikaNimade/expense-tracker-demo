import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ type, variant, onClick, children }) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth
      onClick={onClick}
      sx={{ mt: 3, mb: 2 }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
