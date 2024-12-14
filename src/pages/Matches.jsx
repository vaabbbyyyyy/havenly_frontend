import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  IconButton,
  Button,
} from "@mui/material";
import { BASE_URL } from "../constants";
import { $crud } from "../utils/CrudFactory";
import { Close } from "@mui/icons-material";

export function Matches() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  async function retrieveData() {
    const { data } = await $crud.retrieve("admin/matches", {
      likedUser: currentUser._id,
    });
    return data;
  }

  useEffect(() => {
    retrieveData().then((res) => {
      setMatchedUsers(res.matchedUsers);
    });
  }, [currentUser]);

  const handleRemoveLike = async (userId) => {
    try {
      await $crud.delete(`admin/likes/${userId}`, {
        likedBy: currentUser._id,
        likedUser: userId,
      });
      setMatchedUsers(matchedUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const handleLikeBack = async (userId) => {
    try {
      await $crud.post(`admin/likes`, {
        likedBy: currentUser._id,
        likedUser: userId,
      });

      // Create or get chat
      const { data } = await $crud.post(`admin/chats`, {
        userId1: currentUser._id,
        userId2: userId,
      });

      // Redirect to chat page
      //   navigate(`/app/chat/${data.chat._id}`);
      navigate(`/app/chat`, { state: { chatId: data.chat._id } });
    } catch (error) {
      console.error("Error liking back:", error);
    }
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Lora" }}>
        Matches
      </Typography>
      <Grid container spacing={4}>
        {matchedUsers.map((user) => (
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
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: "Lora" }}
                >
                  {user.name}
                </Typography>
                <div>
                  <IconButton
                    aria-label="remove like"
                    onClick={() => handleRemoveLike(user._id)}
                  >
                    <Close />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleLikeBack(user._id)}
                  >
                    Like Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Matches;
