import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (values.email && values.password) {
      try {
        const response = await axios.post(
          "http://localhost:7070/api/create/admin/login",
          values
        );

        if (response.data.type === "success") {
          enqueueSnackbar(response.data.message, {
            variant: response.data.type,
          });
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          navigate("/app/dashboard");
        } else {
          enqueueSnackbar(response.data.message || "Error in login", {
            variant: "error",
          });
        }
      } catch (error) {
        enqueueSnackbar(error.response?.data?.message || "Error in login", {
          variant: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: 2, fontFamily: "Lora" }}
        >
          Login
        </Typography>

        <form onSubmit={handleLoginSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && !values.email}
            helperText={
              touched.email && !values.email ? "Email is required" : ""
            }
            sx={{ marginBottom: 2, fontFamily: "Lora" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={touched.password && !values.password}
            helperText={
              touched.password && !values.password ? "Password is required" : ""
            }
            sx={{ marginBottom: 3, fontFamily: "Lora" }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              fontFamily: "Lora",
              textTransform: "capitalize",
              backgroundColor: "rgba(103, 60, 142, 0.06)",
              "&:hover": { boxShadow: "none" },
              color: "#000",
              boxShadow: "none",
            }}
          >
            Login
          </Button>
        </form>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography
            onClick={() => navigate("/signup")}
            variant="caption2"
            sx={{ cursor: "pointer", fontFamily: "Lora" }}
          >
            Don't have an account? <b>Sign Up</b>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
