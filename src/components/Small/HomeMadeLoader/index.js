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
            color: 'secondary.main',
            filter: 'drop-shadow(0 0 8px rgba(218, 165, 32, 0.40))',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'secondary.main',
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
