import React from "react";
import {
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Paper
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";

const BookingSwitch = ({ resaOpen, handleChangeResaOpen }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 3,
        backgroundColor: resaOpen ? 'success.dark' : 'error.dark',
        borderRadius: 2,
        transition: 'all 0.3s ease'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {resaOpen ? (
            <CheckCircleIcon sx={{ color: 'white', fontSize: 28 }} />
          ) : (
            <CancelIcon sx={{ color: 'white', fontSize: 28 }} />
          )}
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 600
            }}
          >
            {resaOpen ? "Réservations activées" : "Réservations désactivées"}
          </Typography>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={resaOpen}
              onChange={handleChangeResaOpen}
              color="default"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: 'success.light',
                  '&:hover': {
                    backgroundColor: 'rgba(76, 175, 80, 0.08)'
                  }
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: 'success.light'
                }
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
              {resaOpen ? "Désactiver" : "Activer"}
            </Typography>
          }
          labelPlacement="start"
          sx={{
            m: 0,
            gap: 1
          }}
        />
      </Box>
    </Paper>
  );
};

export default BookingSwitch;
