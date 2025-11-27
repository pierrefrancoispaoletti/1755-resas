import React from "react";
import { Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

const EmptyFormButton = ({ handleEmptyForm }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<RefreshIcon />}
      onClick={handleEmptyForm}
      sx={{
        borderRadius: 3,
        py: 1.5,
        px: 3,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.2s'
      }}
    >
      Recharger
    </Button>
  );
};

export default EmptyFormButton;
