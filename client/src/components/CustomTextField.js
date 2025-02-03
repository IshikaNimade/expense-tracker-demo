import React from "react";
import { TextField, InputAdornment } from "@mui/material";

const CustomTextField = ({
  label,
  type,
  value,
  onChange,
  icon,
  name,
  select,
  children,
}) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      select={select}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    >
      {select && children}
    </TextField>
  );
};

export default CustomTextField;
