import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

// Transition pour l'animation de slide (de bas vers haut)
const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const Toast = ({ message }) => {
  const isVisible = Object.keys(message).length > 0 && message.message !== "";

  return (
    <Snackbar
      open={isVisible}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{
        bottom: { xs: 16, sm: 24 },
        '& .MuiPaper-root': {
          minWidth: { xs: '90%', sm: 400 },
          maxWidth: { xs: '90%', sm: 600 }
        }
      }}
    >
      <Alert
        severity={message.success ? "success" : "error"}
        variant="filled"
        sx={{
          width: '100%',
          fontSize: { xs: '0.95rem', sm: '1rem' },
          fontWeight: 500,
          borderRadius: 2,
          boxShadow: 3,
          '& .MuiAlert-icon': {
            fontSize: { xs: 24, sm: 28 }
          }
        }}
        icon={message.success ? undefined : undefined} // Utilise les icônes par défaut de MUI
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
