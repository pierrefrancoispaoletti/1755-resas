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
    if (success) return {
      icon: CheckCircleIcon,
      bg: 'rgba(27, 94, 32, 0.30)',
      border: 'rgba(76, 175, 80, 0.45)',
      glow: 'rgba(76, 175, 80, 0.30)',
    };
    if (error) return {
      icon: ErrorIcon,
      bg: 'rgba(139, 0, 0, 0.30)',
      border: 'rgba(244, 67, 54, 0.45)',
      glow: 'rgba(244, 67, 54, 0.30)',
    };
    return {
      icon: EventAvailableIcon,
      bg: 'rgba(255, 255, 255, 0.04)',
      border: 'rgba(218, 165, 32, 0.25)',
      glow: 'rgba(218, 165, 32, 0.15)',
    };
  };

  const { bg, border, glow, icon: IconComponent } = getHeaderState();

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
        backgroundColor: bg,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: 3,
        p: { xs: 2, sm: 3 },
        mb: 3,
        border: '1px solid',
        borderColor: border,
        boxShadow: `0 4px 24px ${glow}`,
        textAlign: 'center',
        transition: 'all 0.3s ease-in-out',
        transform: success || error ? 'scale(1.02)' : 'scale(1)',
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
            filter: `drop-shadow(0 0 8px ${glow})`
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
            fontFamily: '"Dancing Script", cursive',
          }}
        >
          {getMessage()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default HomeHeader;
