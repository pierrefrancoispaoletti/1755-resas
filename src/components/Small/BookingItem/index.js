import React, { memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
  Divider
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  People as PeopleIcon,
  Event as EventIcon,
  AccessTime as TimeIcon
} from "@mui/icons-material";
import { calculateDate } from "../../../utils";

const BookingItem = ({
  bookerName,
  bookerEmail,
  bookerNumber,
  bookerPhoneNumber,
  bookingDate,
  bookingTime,
  bookingValidatedByAdmin,
}) => {
  // Déterminer la couleur et le texte selon le statut
  const getStatusConfig = () => {
    if (bookingValidatedByAdmin === null) {
      return { color: 'primary', label: 'New !', borderColor: 'primary.main', animate: true };
    }
    if (bookingValidatedByAdmin === true) {
      return { color: 'success', label: 'Acceptée', borderColor: 'success.main', animate: false };
    }
    return { color: 'error', label: 'Refusée', borderColor: 'error.light', animate: false };
  };

  const statusConfig = getStatusConfig();
  const dateInfo = calculateDate(bookingDate);

  return (
    <Card
      elevation={3}
      sx={{
        position: 'relative',
        borderLeft: '4px solid',
        borderColor: statusConfig.borderColor,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      {/* Status Chip */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          right: 12
        }}
      >
        <Chip
          label={statusConfig.label}
          color={statusConfig.color}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            ...(statusConfig.animate && {
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' }
              }
            })
          }}
        />
      </Box>

      <CardContent sx={{ pt: 5 }}>
        {/* Nom et actions */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                flex: 1,
                minWidth: 0
              }}
            >
              {bookerName}
            </Typography>

            {/* Boutons téléphone et email */}
            <Stack direction="row" spacing={0.5}>
              {bookerPhoneNumber && (
                <IconButton
                  component="a"
                  href={`tel:${bookerPhoneNumber}`}
                  size="small"
                  aria-label={`Appeler ${bookerName} au ${bookerPhoneNumber}`}
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText'
                    }
                  }}
                >
                  <PhoneIcon fontSize="small" />
                </IconButton>
              )}

              <IconButton
                component="a"
                href={`mailto:${bookerEmail}`}
                size="small"
                aria-label={`Envoyer un email à ${bookerName}`}
                sx={{
                  color: 'info.main',
                  '&:hover': {
                    backgroundColor: 'info.light',
                    color: 'info.contrastText'
                  }
                }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Détails de la réservation */}
        <Stack spacing={1.5}>
          {/* Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon color="action" fontSize="small" />
            <Typography variant="body1" color="text.secondary">
              <strong>{dateInfo[1]}</strong> - {new Date(bookingDate).toLocaleString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Typography>
          </Box>

          {/* Heure */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimeIcon color="action" fontSize="small" />
            <Typography variant="body1" color="text.secondary">
              <strong>{bookingTime}</strong>
            </Typography>
          </Box>

          {/* Nombre de personnes */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon color="action" fontSize="small" />
            <Typography variant="body1" color="text.secondary">
              <strong>{bookerNumber}</strong> {bookerNumber > 1 ? 'personnes' : 'personne'}
            </Typography>
          </Box>
        </Stack>

        {/* Contact info (mobile/desktop) */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack spacing={0.5}>
            {bookerPhoneNumber && (
              <Typography variant="caption" color="text.secondary">
                <PhoneIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                {bookerPhoneNumber}
              </Typography>
            )}
            <Typography variant="caption" color="text.secondary">
              <EmailIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
              {bookerEmail}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(BookingItem);
