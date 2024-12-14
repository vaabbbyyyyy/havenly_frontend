import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import { BASE_URL } from "../constants";
import { $crud } from "../utils/CrudFactory";
import { Close } from "@mui/icons-material";

export function Likes() {
  const [likedUsers, setLikedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  async function retrieveData() {
    const { data } = await $crud.retrieve("admin/likes", {
      likedBy: currentUser._id,
    });
    return data;
  }
  useEffect(() => {
    retrieveData().then((res) => {
      setLikedUsers(res.likedUsers);
    });
  }, [currentUser]);

  const handleRemoveLike = async (userId) => {
    try {
      await $crud.delete(`admin/likes/${userId}`, {
        likedBy: currentUser._id,
        likedUser: userId,
      });
      setLikedUsers(likedUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Lora" }}>
        Liked Users
      </Typography>
      <Grid container spacing={4}>
        {likedUsers.map((user) => (
          <Grid item key={user._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`${BASE_URL}userProfiles/${user.profile}`}
                alt={user.name}
              />
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  sx={{ fontFamily: "Lora" }}
                  variant="h5"
                  component="div"
                >
                  {user.name}
                </Typography>
                <IconButton
                  aria-label="remove like"
                  onClick={() => handleRemoveLike(user._id)}
                >
                  <Close />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Likes;
