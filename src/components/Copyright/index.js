import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Stack,
  Link as MuiLink
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Favorite as FavoriteIcon
} from "@mui/icons-material";

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Section Réseaux Sociaux */}
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontFamily: 'typography.fontFamilySubtitle',
            textAlign: 'center',
            color: 'text.primary'
          }}
        >
          Retrouvez nous sur :
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton
            component="a"
            href="fb://profile/196458368600"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitez notre page Facebook"
            sx={{
              color: '#3B5998',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <FacebookIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <IconButton
            component="a"
            href="https://www.instagram.com/1755baravin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitez notre page Instagram"
            sx={{
              color: '#E4405F',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <InstagramIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: 'divider' }} />

      {/* Section Contact */}
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontFamily: 'typography.fontFamilySubtitle',
            textAlign: 'center',
            color: 'text.primary'
          }}
        >
          Contactez nous !
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton
            component="a"
            href="mailto:christophemartinetti@baravin1755.com"
            aria-label="Envoyez-nous un email"
            sx={{
              color: 'info.main',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <EmailIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <IconButton
            component="a"
            href="tel:0609542757"
            aria-label="Appelez-nous au 06 09 54 27 57"
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s'
            }}
          >
            <PhoneIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: 'divider' }} />

      {/* Section Copyright */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontFamily: 'typography.fontFamilySubtitle',
            mb: 1
          }}
        >
          Copyright ©{' '}
          <MuiLink
            href="https://baravin1755.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline'
              }
            }}
          >
            Le 1755
          </MuiLink>
          {' '}{currentYear}.
        </Typography>

        {/* Crédit développeur */}
        <MuiLink
          href="mailto:pef@alvp-developments.com"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              color: 'primary.main'
            },
            transition: 'color 0.2s'
          }}
        >
          Made with
          <FavoriteIcon
            sx={{
              fontSize: 20,
              color: 'primary.main',
              animation: 'heartbeat 1.5s ease-in-out infinite',
              '@keyframes heartbeat': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' }
              }
            }}
          />
          by ALVP-Developments Ajaccio
        </MuiLink>
      </Box>
    </Box>
  );
};

export default Copyright;
