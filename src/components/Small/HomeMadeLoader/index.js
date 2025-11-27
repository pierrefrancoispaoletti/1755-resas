import React from "react";
import { Box, CircularProgress, Typography, Stack } from "@mui/material";

const HomeMadeLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
        py: 4
      }}
    >
      <Stack spacing={2} alignItems="center">
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main'
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            letterSpacing: '0.1em',
            animation: 'pulse 1.5s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0.6 },
              '50%': { opacity: 1 }
            }
          }}
        >
          CHARGEMENT...
        </Typography>
      </Stack>
    </Box>
  );
};

export default HomeMadeLoader;
