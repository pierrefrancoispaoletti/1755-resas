import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { EventBusy as EventBusyIcon } from "@mui/icons-material";

const NoBookings = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        borderRadius: 3
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <EventBusyIcon
          sx={{
            fontSize: 64,
            color: 'text.disabled'
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 500
          }}
        >
          Désolé, il n'y a pas de réservations pour le moment
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.disabled'
          }}
        >
          Les réservations apparaîtront ici une fois qu'elles seront effectuées
        </Typography>
      </Box>
    </Paper>
  );
};

export default NoBookings;
