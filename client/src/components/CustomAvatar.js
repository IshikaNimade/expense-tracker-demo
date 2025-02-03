import React, { useContext } from "react";
import { Avatar, Typography, Box, useTheme, Stack } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const CustomAvatar = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const getInitials = (name = "User") => {
    if (!name || typeof name !== "string") return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Stack direction={"row"} alignItems={"center"} paddingBottom={4}>
      <Avatar
        sx={{
          width: 60,
          height: 60,
          bgcolor: theme.palette.primary.main,
          fontSize: "1.5rem",
          fontWeight: "bold",
          mr: 2,
        }}
      >
        {getInitials(user?.name || "User")}
      </Avatar>
      <Box>
        <Typography sx={{ fontWeight: "bold", color: "#2B3674" }}>
          {user?.name || "User Name"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#A3AED0" }}>
          {user?.email || "xyz@domain.in"}
        </Typography>
      </Box>
    </Stack>
  );
};

export default CustomAvatar;
