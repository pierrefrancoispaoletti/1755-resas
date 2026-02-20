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
    <Box
      sx={{
        mt: 2,
        borderRadius: '14px 14px 0 0',
        overflow: 'hidden',
      }}
    >
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
                background: 'linear-gradient(135deg, #1B5E20, #388E3C, #4CAF50)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2B6E30, #489E4C, #5CBF60)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 16px rgba(76, 175, 80, 0.50)',
                },
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(76, 175, 80, 0.30)',
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
                background: 'linear-gradient(135deg, #5C0000, #8B0000, #B22222)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6C0000, #9B1010, #C23232)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 16px rgba(139, 0, 0, 0.50)',
                },
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(139, 0, 0, 0.30)',
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
                background: 'linear-gradient(135deg, #5C0000, #8B0000, #B22222)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6C0000, #9B1010, #C23232)',
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 16px rgba(139, 0, 0, 0.50)',
                },
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(139, 0, 0, 0.30)',
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
