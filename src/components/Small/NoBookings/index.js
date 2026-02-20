import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { EventBusy as EventBusyIcon } from "@mui/icons-material";

const filterMessages = {
  [-1]: {
    title: "Aucune réservation passée",
    subtitle: "Il n'y a pas de réservations antérieures",
  },
  0: {
    title: "Aucune réservation aujourd'hui",
    subtitle: "Il n'y a pas de réservations pour ce jour",
  },
  1: {
    title: "Aucune réservation demain",
    subtitle: "Il n'y a pas de réservations pour demain",
  },
  2: {
    title: "Aucune réservation à venir",
    subtitle: "Il n'y a pas de réservations dans les prochains jours",
  },
};

const NoBookings = ({ filter = 0 }) => {
  const msg = filterMessages[filter] ?? filterMessages[0];

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <EventBusyIcon
          sx={{
            fontSize: 64,
            color: 'secondary.dark',
            filter: 'drop-shadow(0 0 8px rgba(218, 165, 32, 0.30))',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          {msg.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.disabled",
          }}
        >
          {msg.subtitle}
        </Typography>
      </Box>
    </Paper>
  );
};

export default NoBookings;
