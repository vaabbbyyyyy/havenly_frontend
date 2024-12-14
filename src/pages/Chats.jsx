import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { $crud } from "../utils/CrudFactory";
import { BASE_URL } from "../constants";

export function Chats() {
  const [chats, setChats] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await $crud.retrieve("admin/chats", {
        userId: currentUser._id,
      });
      setChats(data.chats);
    };

    fetchChats();
  }, [currentUser]);

  const handleChatClick = (chatId) => {
    navigate(`/app/chat`, { state: { chatId } });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Lora" }}>
        Chats
      </Typography>
      <List>
        {chats.map((chat) => {
          const otherParticipant = chat.participants.find(
            (participant) => participant._id !== currentUser._id
          );
          return (
            <ListItem
              key={chat._id}
              sx={{
                background: "rgba(103, 60, 142, 0.06)",
                borderRadius: "10px",
                cursor: "pointer",
                mb: 2,
              }}
              button
              onClick={() => handleChatClick(chat._id)}
            >
              <ListItemAvatar>
                <Avatar
                  src={`${BASE_URL}userProfiles/${otherParticipant.profile}`}
                  alt={otherParticipant.name}
                />
              </ListItemAvatar>
              <ListItemText
                primary={otherParticipant.name}
                secondary={
                  chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].message
                    : "No messages yet"
                }
                primaryTypographyProps={{ sx: { fontFamily: "Lora" } }}
                secondaryTypographyProps={{ sx: { fontFamily: "Lora" } }}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default Chats;
