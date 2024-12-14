import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import e1 from "../assets/e1.jpg";
import e2 from "../assets/e2.jpg";
import e3 from "../assets/e3.jpg";
import e4 from "../assets/e4.jpg";
import e5 from "../assets/e5.jpg";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    title: " All Things Open",
    image: e1, // Replace with your event image URL
  },
  {
    id: 2,
    title: "SmashingConf",
    image: e2, // Replace with your event image URL
  },
  {
    id: 3,
    title: "PUSH UX",
    image: e3, // Replace with your event image URL
  },
  {
    id: 4,
    title: "CONNECT.TECH",
    image: e4, // Replace with your event image URL
  },
  {
    id: 5,
    title: " JSNation US",
    image: e5, // Replace with your event image URL
  },
];

const clubs = [
  {
    id: 1,
    title: "Book club",
    image: b1, // Replace with your club image URL
  },
  {
    id: 2,
    title: "Singing club",
    image: b2, // Replace with your club image URL
  },
  {
    id: 3,
    title: "Sketching club",
    image: b3, // Replace with your club image URL
  },
  {
    id: 4,
    title: "Drama club",
    image: b4, // Replace with your club image URL
  },
  {
    id: 5,
    title: "Artist club",
    image: b5, // Replace with your club image URL
  },
];

export function EventClub() {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: "30px" }}>
      <Typography variant="h4" sx={{ fontFamily: "Lora", mb: 4 }}>
        Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={event.id}>
            <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
              <CardMedia
                component="img"
                height="300px"
                image={event.image}
                alt={event.title}
                sx={{ borderRadius: "10px" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: "Lora", mb: 1 }}>
                  {event.title}
                </Typography>
                <Button
                  onClick={() => navigate("/app/event-coming-soon")}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "capitalize", fontFamily: "Lora" }}
                >
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ fontFamily: "Lora", mt: 6, mb: 4 }}>
        Clubs
      </Typography>
      <Grid container spacing={2}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={club.id}>
            <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
              <CardMedia
                component="img"
                height="300px"
                image={club.image}
                alt={club.title}
                sx={{ borderRadius: "10px" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: "Lora", mb: 1 }}>
                  {club.title}
                </Typography>
                <Button
                  onClick={() => navigate("/app/club-coming-soon")}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "capitalize", fontFamily: "Lora" }}
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EventClub;
