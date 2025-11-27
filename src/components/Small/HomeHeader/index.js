import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  EventAvailable as EventAvailableIcon
} from "@mui/icons-material";

const HomeHeader = ({ success, error }) => {
  // Déterminer l'état du header
  const getHeaderState = () => {
    if (success) return { color: 'success.main', icon: CheckCircleIcon };
    if (error) return { color: 'error.main', icon: ErrorIcon };
    return { color: 'grey.600', icon: EventAvailableIcon };
  };

  const { color, icon: IconComponent } = getHeaderState();

  // Déterminer le message
  const getMessage = () => {
    if (success) {
      return "Votre réservation a été effectuée avec succès, vous allez recevoir un mail de confirmation";
    }
    if (error) {
      return "Votre réservation a échoué, veuillez recommencer";
    }
    return "Réservez votre table maintenant";
  };

  return (
    <Paper
      elevation={3}
      sx={{
        background: `linear-gradient(135deg, ${
          success ? '#4CAF50' : error ? '#F44336' : '#757575'
        } 0%, ${
          success ? '#388E3C' : error ? '#D32F2F' : '#616161'
        } 100%)`,
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        mb: 3,
        border: '3px solid',
        borderColor: color,
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
        transform: success || error ? 'scale(1.02)' : 'scale(1)'
      }}
      role="status"
      aria-live="polite"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <IconComponent
          sx={{
            fontSize: { xs: 32, sm: 40 },
            color: 'white',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: 'typography.fontFamilyHeading'
          }}
        >
          {getMessage()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default HomeHeader;
