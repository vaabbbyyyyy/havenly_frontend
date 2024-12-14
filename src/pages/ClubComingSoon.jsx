import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ClubComingSoon() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ mb: 2, fontFamily: "Lora" }}>
        Coming Soon
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/app/events-clubs")}
        sx={{ textTransform: "capitalize", fontFamily: "Lora" }}
      >
        Back to Clubs
      </Button>
    </Box>
  );
}
