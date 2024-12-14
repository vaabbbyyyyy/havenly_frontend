import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload"; // Import the upload icon
import axios from "axios"; // Import axios to send the HTTP request
import { BASE_URL } from "../../constants";

export function UserProfile() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  //   console.log(userDetails._id, "==========================");

  const handleProfilePictureUpload = async () => {
    if (!profilePicture) {
      alert("Please select a profile picture to upload.");
      return;
    }

    try {
      const formData = new FormData();
      const file = dataURLtoFile(profilePicture, "profile.jpg"); // Convert base64 to file
      formData.append("profile", file);
      console.log(userDetails._id, "==========================");

      formData.append("userId", userDetails._id); // Ensure userId is added

      const response = await axios.put(
        "http://localhost:7070/api/update/admin/user-profile",
        formData,
        {
          headers: {
            userId: userDetails._id,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile picture uploaded successfully!");

        // Update localStorage with the new user profile
        const updatedUserDetails = {
          ...userDetails,
          profilePicture: response.data.profilePictureUrl,
        }; // Assuming backend returns the URL of the uploaded profile picture
        localStorage.setItem("user", JSON.stringify(updatedUserDetails));

        // Refresh the page to reflect changes
        // window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("Failed to upload profile picture.");
    }
  };

  // Convert base64 to File object (so it can be uploaded)
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Left Side: Profile Image Upload */}
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "2px dashed #ccc",
              padding: 2,
              borderRadius: "10px",
              height: "500px",
              width: "400px",
              justifyContent: "center",
            }}
          >
            <img
              style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
              src={`${BASE_URL}userProfiles/${userDetails.profile}`}
            />
          </Box>
        </Grid>

        {/* Right Side: User Details */}
        <Grid item xs={12} sm={8}>
          <Box sx={{ padding: 2 }}>
            <Typography sx={{ fontFamily: "Lora" }} variant="h5">
              User Profile
            </Typography>

            <Typography variant="h6" sx={{ marginTop: 2, fontFamily: "Lora" }}>
              Name: {userDetails.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: 1, fontFamily: "Lora" }}
            >
              Email: {userDetails.email}
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginTop: 1, fontFamily: "Lora" }}
            >
              Likes: {userDetails.likes ? userDetails.likes.join(", ") : "N/A"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: 1, fontFamily: "Lora" }}
            >
              Interests:{" "}
              {userDetails.interests ? userDetails.interests.join(", ") : "N/A"}
            </Typography>

            <Typography
              variant="body1"
              sx={{ marginTop: 1, fontFamily: "Lora" }}
            >
              Prompts:{" "}
              {userDetails.prompts ? userDetails.prompts.join(", ") : "N/A"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
