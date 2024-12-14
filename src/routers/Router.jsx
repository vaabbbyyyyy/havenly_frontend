import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { Footer, Header, Sidebar } from "../components";
import {
  Chat,
  Chats,
  ClubComingSoon,
  EventClub,
  EventComingSoon,
  Home,
  LandingPage,
  Likes,
  Login,
  Matches,
  Signup,
  UserProfile,
} from "../pages";
import { Box, CssBaseline } from "@mui/material";
import ChatbotButton from "../components/ChatbotButton"; // Import the ChatbotButton component
import { Memories } from "../pages/Memories";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route for Landing Page */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* Public Route for Login Page */}
        <Route
          path="signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <Sidebar />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh", // Full viewport height
                  }}
                >
                  <Header />
                  <Routes>
                    <Route index element={<Navigate to="/" />} />{" "}
                    <Route path="dashboard" element={<Home />} />{" "}
                    <Route path="profile" element={<UserProfile />} />{" "}
                    <Route path="likes" element={<Likes />} />{" "}
                    <Route path="matches" element={<Matches />} />{" "}
                    <Route path="chat" element={<Chat />} />{" "}
                    <Route path="chats" element={<Chats />} />{" "}
                    <Route path="memories" element={<Memories />} />{" "}
                    <Route
                      path="club-coming-soon"
                      element={<ClubComingSoon />}
                    />{" "}
                    <Route
                      path="event-coming-soon"
                      element={<EventComingSoon />}
                    />{" "}
                    <Route path="events-clubs" element={<EventClub />} />{" "}
                  </Routes>
                  <Footer />
                </Box>
              </Box>
              <ChatbotButton /> {/* Add the ChatbotButton component */}
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
