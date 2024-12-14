import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { $crud } from "../utils/CrudFactory";

export function Chat() {
  const location = useLocation();
  const { chatId } = location.state || {};
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [otherParticipant, setOtherParticipant] = useState(null);

  useEffect(() => {
    if (chatId) {
      const fetchChat = async () => {
        const { data } = await $crud.retrieve(`admin/chats/${chatId}`);
        setChat(data.chat);

        // Determine the other participant
        const other = data.chat.participants.find(
          (participant) => participant._id !== currentUser._id
        );
        setOtherParticipant(other);
      };

      fetchChat();
    }
  }, [chatId, currentUser._id]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const { data } = await $crud.post(`admin/chats/${chatId}/messages`, {
        sender: currentUser._id,
        message,
      });
      setChat(data.chat);
      setMessage("");
    }
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "80vh" }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: "Lora" }}>
        {otherParticipant ? `Chat with ${otherParticipant.name}` : "Chat"}
      </Typography>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {chat && (
          <List>
            {chat.messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText
                  primaryTypographyProps={{ sx: { fontFamily: "Lora" } }}
                  secondaryTypographyProps={{ sx: { fontFamily: "Lora" } }}
                  primary={msg.message}
                  secondary={msg.sender === currentUser._id ? "You" : "Them"}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}

export default Chat;
