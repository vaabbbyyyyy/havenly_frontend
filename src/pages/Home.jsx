import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Fab,
} from "@mui/material";
import { $crud } from "../utils/CrudFactory";
import { BASE_URL } from "../constants";
import { Close, Favorite } from "@mui/icons-material";
import ChatbotIcon from "../assets/chatbot.jpg"; // Assuming you have the chatbot icon in the assets folder

export function Home() {
  const [users, setUsers] = useState([]); // All users from the database
  const [currentUser, setCurrentUser] = useState(null); // Current logged-in user
  const [index, setIndex] = useState(0); // Index of the current user profile being shown
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user._id;

  async function fetchUsers(loggedInUserId) {
    const apiUrl = `http://localhost:7070/api/retrieve/admin/users?exclude=${encodeURIComponent(
      loggedInUserId
    )}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const result = await response.json();
      return result; // Return the whole result (including `data`)
    } catch (err) {
      console.error("Error fetching users:", err.message);
      return { users: [] }; // Return an empty array in case of an error
    }
  }

  useEffect(() => {
    fetchUsers(loggedInUserId).then((res) => {
      setUsers(res?.data?.users);
      setCurrentUser(loggedInUserId);
    });
  }, []);

  // Handle Like
  const handleLike = async (likedUser) => {
    const { type } = await $crud.put(`admin/user-like`, {
      likedBy: currentUser,
      likedUser: likedUser._id,
    });
    if (type == "success") {
      setIndex((prevIndex) => (prevIndex + 1) % users.length);
    }
  };

  // Handle Dislike
  const handleDislike = () => {
    // Move to the next profile
    setIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const currentProfile = users[index];

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const toggleChatbot = () => {
    const chatbotEmbed = document.querySelector(
      "zapier-interfaces-chatbot-embed"
    );
    if (chatbotEmbed) {
      chatbotEmbed.style.display =
        chatbotEmbed.style.display === "none" ? "block" : "none";
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "80vh" }}>
      <Grid
        container
        spacing={2}
        sx={{ paddingLeft: "30px", paddingRight: "30px" }}
      >
        <Grid item lg={6}>
          <Typography variant="h6" sx={{ fontFamily: "Lora", mb: 2 }}>
            Start liking the people you are interested in!{" "}
          </Typography>
          {currentProfile ? (
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Box
                  sx={{
                    width: "300px",
                    height: "400px",
                    border: "1px dashed grey",
                    borderRadius: "10px",
                    padding: "10px",
                    mb: 3,
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                    }}
                    src={`${BASE_URL}userProfiles/${currentProfile.profile}`}
                  />
                </Box>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDislike}
                    >
                      <Close />
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleLike(currentProfile)}
                    >
                      <Favorite />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={6}>
                <CardContent>
                  <Typography variant="h5" sx={{ fontFamily: "Lora", mb: 2 }}>
                    Name : {currentProfile.name}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Lora", mb: 2 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <b>About You:</b>
                    <br />
                    {currentProfile.aboutYou || "N/A"}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Lora", mb: 2 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <b>Likes:</b> <br />
                    {currentProfile.likes
                      ? currentProfile.likes.join(", ")
                      : "N/A"}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Lora", mb: 2 }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <b>Interests:</b> <br />
                    {currentProfile.interests
                      ? currentProfile.interests.join(", ")
                      : "N/A"}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Lora" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    <b>Prompts:</b> <br />
                    {currentProfile.prompts
                      ? currentProfile.prompts.join(", ")
                      : "N/A"}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="h5" sx={{ fontFamily: "Lora" }}>
              No profiles left to show!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
