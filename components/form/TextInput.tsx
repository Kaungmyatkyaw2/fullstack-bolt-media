import { TextField } from "@mui/material";
import React from "react";

interface propType {
  label: String;
  name: string;
  type: string;
}

const TextInput = ({ name, label, type }: propType) => {
  return (
    <TextField
      margin="normal"
      required
      sx={{
        "& .MuiInputBase-root": {
          color: "white",
          fontSize: "14px",
          //   border: "1px solid orange",
        },
        "& label.Mui-focused": {
          color: "white",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#EF4444",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "gray",
          },
          "&:hover fieldset": {
            borderColor: "gray",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ff3333",
          },
        },
      }}
      InputLabelProps={{
        style: { color: "#fff", fontSize: "14px" },
      }}
      fullWidth
      name={name}
      label={label}
      type={type}
      id="password"
      autoComplete="off"
    />
  );
};

export default TextInput;
