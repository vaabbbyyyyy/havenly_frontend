import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [finalData, setfinalData] = useState({
    email: "",
    name: "",
    password: "",
    aboutYou: "",
    likes: [],
    interests: [],
    prompts: [],
    profilePicture: null,
  });

  const [values, setValues] = useState({ email: "", name: "", password: "" });
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDialogOpen = (e) => {
    e.preventDefault();
    setTouched({ email: true, name: true, password: true });

    if (values.email && values.name && values.password) {
      setfinalData((prev) => ({ ...prev, ...values }));
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentStep(0);
    setfinalData({
      email: "",
      name: "",
      password: "",
      aboutYou: "",
      likes: [],
      interests: [],
      prompts: [],
      profilePicture: null,
    });
  };

  const handleRegisterSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", finalData.profilePicture);
      formData.append("email", finalData.email);
      formData.append("name", finalData.name);
      formData.append("password", finalData.password);
      formData.append("aboutYou", finalData.aboutYou);
      formData.append("likes", finalData.likes);
      formData.append("interests", finalData.interests);
      formData.append("prompts", finalData.prompts);

      const response = await axios.post(
        "http://localhost:7070/api/create/admin/signup",
        formData
      );

      if (response.data.type == "success") {
        console.log(response.data, "================");
        enqueueSnackbar(response.data.message, { variant: response.data.type });
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        handleDialogClose();
        navigate("/app/dashboard");
      } else {
        enqueueSnackbar(response.data.message || "Error in signup", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || "Error in signup", {
        variant: "error",
      });
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setfinalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name, option) => {
    setfinalData((prev) => {
      const updatedArray = prev[name].includes(option)
        ? prev[name].filter((item) => item !== option)
        : [...prev[name], option];
      return { ...prev, [name]: updatedArray };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setfinalData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const questions = [
    {
      label: "Tell us more about yourself",
      content: (
        <TextField
          fullWidth
          multiline
          rows={4}
          name="aboutYou"
          sx={{ fontFamily: "Lora" }}
          value={finalData.aboutYou}
          onChange={handleInputChange}
          placeholder="Write about yourself"
        />
      ),
    },
    {
      label: "What are your likes?",
      content: (
        <FormGroup>
          {["Music", "Movies", "Sports", "Reading"].map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={finalData.likes.includes(option)}
                  onChange={() => handleCheckboxChange("likes", option)}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      ),
    },
    {
      label: "What are your interests?",
      content: (
        <FormGroup>
          {["Technology", "Travel", "Cooking", "Art"].map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  checked={finalData.interests.includes(option)}
                  onChange={() => handleCheckboxChange("interests", option)}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      ),
    },
    {
      label: "Select your preferred prompts",
      content: (
        <FormGroup>
          {["Challenge", "Creativity", "Collaboration", "Leadership"].map(
            (option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={finalData.prompts.includes(option)}
                    onChange={() => handleCheckboxChange("prompts", option)}
                  />
                }
                label={option}
              />
            )
          )}
        </FormGroup>
      ),
    },
    {
      label: "Upload your profile picture",
      content: (
        <Box>
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </Box>
      ),
    },
  ];

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
          Sign Up
        </Typography>

        <form onSubmit={handleDialogOpen}>
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
            label="Name"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && !values.name}
            helperText={touched.name && !values.name ? "Name is required" : ""}
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
              color: "#000",
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography
            onClick={() => navigate("/login")}
            variant="caption2"
            sx={{ cursor: "pointer", fontFamily: "Lora" }}
          >
            Already have an account? <b>Login</b>
          </Typography>
        </Box>
      </Box>

      {/* Dialog for multi-step questions */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isDialogOpen}
        onClose={handleDialogClose}
        sx={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 204, 0.3)",
        }}
      >
        <DialogTitle sx={{ fontFamily: "Lora" }}>
          {questions[currentStep].label}
        </DialogTitle>
        <DialogContent sx={{ fontFamily: "Lora" }}>
          {questions[currentStep].content}
        </DialogContent>
        <DialogActions>
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              color="primary"
              sx={{ fontFamily: "Lora", textTransform: "capitalize" }}
            >
              Back
            </Button>
          )}
          {currentStep < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              color="primary"
              sx={{ fontFamily: "Lora", textTransform: "capitalize" }}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleRegisterSubmit}
              color="primary"
              sx={{ fontFamily: "Lora", textTransform: "capitalize" }}
            >
              Register
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
