import React from "react";
import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        padding: 2,
        textAlign: "center",
        position: "fixed", // Makes the footer stick at the bottom
        bottom: 0, // Positions it at the bottom of the page
        left: 0, // Ensures it stretches to the full width
        width: "100%", // Ensures it spans the entire width
      }}
    >
      <Typography
        sx={{ fontFamily: "Lora" }}
        variant="body2"
        color="text.secondary"
      >
        &copy; 2024 Havenly. All rights reserved.
      </Typography>
    </Box>
  );
}
