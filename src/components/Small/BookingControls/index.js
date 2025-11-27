import React, { memo } from "react";
import { Box, IconButton, Tooltip, Stack } from "@mui/material";
import {
  Check as CheckIcon,
  Close as CloseIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";

const BookingControls = ({
  booking,
  handleValidateBooking,
  handleDeleteBooking,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      {booking.bookingValidatedByAdmin === null ? (
        // Nouvelle réservation - Boutons Accept/Reject
        <Stack direction="row" spacing={2} justifyContent="center">
          <Tooltip title="Accepter la réservation" arrow>
            <IconButton
              color="success"
              size="large"
              onClick={() => handleValidateBooking(booking, true)}
              aria-label="Accepter la réservation"
              sx={{
                backgroundColor: 'success.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'success.dark',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s',
                boxShadow: 2
              }}
            >
              <CheckIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Refuser la réservation" arrow>
            <IconButton
              color="error"
              size="large"
              onClick={() => handleValidateBooking(booking, false)}
              aria-label="Refuser la réservation"
              sx={{
                backgroundColor: 'error.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'error.dark',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s',
                boxShadow: 2
              }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        // Réservation traitée - Bouton Delete
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Supprimer définitivement" arrow>
            <IconButton
              color="error"
              size="large"
              onClick={() => handleDeleteBooking(booking)}
              aria-label="Supprimer la réservation"
              sx={{
                backgroundColor: 'error.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'error.dark',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s',
                boxShadow: 2
              }}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default memo(BookingControls);
