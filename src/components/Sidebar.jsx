import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export function Sidebar() {
  const navigate = useNavigate();
  const navLinks = [
    {
      label: "Dashboard",
      route: "/app/dashboard",
      // icon: <DashboardCustomizeRounded />,
    },
    {
      label: "Matches",
      route: "/app/matches",
      // icon: <JoinRightRounded />,
    },
    {
      label: "Likes",
      route: "/app/likes",
      // icon: <FavoriteRounded />,
    },
    {
      label: "Chats",
      route: "/app/chats",
      // icon: <FavoriteRounded />,
    },
    {
      label: "Memories",
      route: "/app/memories",
      // icon: <FavoriteRounded />,
    },
    {
      label: "Events & Clubs",
      route: "/app/events-clubs",
      // icon: <FavoriteRounded />,
    },
  ];
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
        <img src={logo} style={{ width: "60%" }} />
      </Box>
      <List sx={{ padding: "8px" }}>
        {navLinks.map((link) => {
          return (
            <ListItem
              key={link.label}
              disablePadding
              sx={{
                color: "#000",
                textAlign: "center",
                mb: 1,
              }}
            >
              <ListItemButton
                sx={{ padding: "2px 10px" }}
                onClick={() => {
                  navigate(link.route);
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: 500,
                    textAlign: "center",
                    fontFamily: "Lora",
                  }}
                  primary={link.label}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
