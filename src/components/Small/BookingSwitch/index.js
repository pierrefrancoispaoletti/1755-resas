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
        backgroundColor: resaOpen
          ? 'rgba(27, 94, 32, 0.35)'
          : 'rgba(92, 0, 0, 0.35)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid',
        borderColor: resaOpen
          ? 'rgba(76, 175, 80, 0.40)'
          : 'rgba(139, 0, 0, 0.40)',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        boxShadow: resaOpen
          ? '0 4px 20px rgba(76, 175, 80, 0.20)'
          : '0 4px 20px rgba(139, 0, 0, 0.20)',
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
