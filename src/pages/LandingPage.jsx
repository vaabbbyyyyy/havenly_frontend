import React from "react";
import { Box, Button, Typography } from "@mui/material";
import landingImg from "../assets/landingImg.jpg";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 204, 0.8)", // Light yellow background
      }}
    >
      {/* Background image */}
      <Box
        alt="Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          backgroundColor: "rgba(255, 255, 204, 0.8)", // Light yellow background
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          width: "50%",
        }}
      >
        <Button
          onClick={() => navigate("/signup")}
          variant="contained"
          sx={{ textTransform: "capitalize" }}
        >
          Login / Sign Up
        </Button>
        <Box
          component="img"
          src={landingImg}
          alt="Logo"
          sx={{
            width: { xs: 200, lg: "100%" }, // Adjust size as needed
            margin: "16px 0",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Adding box shadow
            borderRadius: "10px", // Optional: rounded corners
          }}
        />
      </Box>

      {/* Copyright text */}
      <Box
        sx={{
          position: "absolute",
          bottom: "16px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            color: "rgba(130, 130, 130, 1)",
            fontSize: "16px",
            fontFamily: "Poppins",
          }}
        >
          © Copyright Havenly | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
