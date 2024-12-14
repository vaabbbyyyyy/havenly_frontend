import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { LogoutRounded } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#fff" }} elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="caption2"
            sx={{ color: "#000", fontFamily: "Lora" }}
          >
            Hello, {capitalizeFirstLetter(user.name)}
          </Typography>
          <Avatar
            onClick={() => navigate("/app/profile")}
            sx={{ cursor: "pointer" }}
            src={`${BASE_URL}userProfiles/${user.profile}`}
            alt={capitalizeFirstLetter(user.name)}
          ></Avatar>
          <IconButton
            color="error"
            onClick={() => {
              enqueueSnackbar("Logout successful", {
                variant: "success",
              });
              localStorage.clear();
              navigate("/");
            }}
          >
            <LogoutRounded />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
