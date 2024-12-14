import React, { useEffect } from "react";
import { Fab } from "@mui/material";
import ChatbotIcon from "../assets/chatbot.jpg"; // Assuming you have the chatbot icon in the assets folder

const ChatbotButton = () => {
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
    <>
      <Fab
        color="primary"
        aria-label="chatbot"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#673AB7",
        }}
        onClick={toggleChatbot}
      >
        <img
          src={ChatbotIcon}
          alt="Chatbot"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </Fab>
      <zapier-interfaces-chatbot-embed
        is-popup="false"
        chatbot-id="cm4l2c2tv0007nxji18eschrw"
        height="500px"
        width="400px"
        style={{ position: "fixed", bottom: 80, right: 16, display: "none" }}
      ></zapier-interfaces-chatbot-embed>
    </>
  );
};

export default ChatbotButton;
