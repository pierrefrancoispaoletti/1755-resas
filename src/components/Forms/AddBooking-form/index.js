import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  Button,
  Stack,
  Alert,
  InputAdornment,
  Typography
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Send as SendIcon
} from "@mui/icons-material";

// Schéma de validation Yup
const bookingSchema = yup.object().shape({
  bookerName: yup
    .string()
    .required("Votre nom est obligatoire")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),

  bookerEmail: yup
    .string()
    .required("Votre email est obligatoire")
    .email("Format d'email invalide"),

  bookerPhoneNumber: yup
    .string()
    .required("Votre numéro de téléphone est obligatoire")
    .matches(/^0[1-9](?:\s?\d{2}){4}$/, "Format: 06 12 34 56 78"),

  bookerNumber: yup
    .number()
    .required("Le nombre de personnes est obligatoire")
    .min(1, "Minimum 1 personne")
    .max(20, "Maximum 20 personnes")
    .typeError("Doit être un nombre"),

  bookingDate: yup
    .string()
    .required("La date est obligatoire")
    .test("is-future", "La date ne peut pas être dans le passé", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),

  bookingTime: yup
    .string()
    .required("L'heure est obligatoire")
    .test("min-time", "L'heure doit être après 18h00", (value) => {
      if (!value) return true;
      const [hours] = value.split(":").map(Number);
      return hours >= 18;
    })
});

const AddBookingForm = ({ handleSubmit: onSubmitCallback, booking, setBooking, loading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(bookingSchema),
    mode: "onChange",
    defaultValues: {
      bookerName: booking.bookerName || "",
      bookerEmail: booking.bookerEmail || "",
      bookerPhoneNumber: booking.bookerPhoneNumber || "",
      bookerNumber: booking.bookerNumber || "",
      bookingDate: booking.bookingDate || "",
      bookingTime: booking.bookingTime || ""
    }
  });

  // Fonction de soumission
  const onSubmit = (data) => {
    setBooking((prev) => ({ ...prev, ...data }));
    onSubmitCallback(data);
  };

  // Formater le numéro de téléphone pendant la saisie
  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4], match[5]]
        .filter(Boolean)
        .join(" ");
    }
    return value;
  };

  // Date minimum (aujourd'hui)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: { xs: 2, sm: 3 }
      }}
      noValidate
    >
      <Stack spacing={3}>
        {/* Nom */}
        <Controller
          name="bookerName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Votre nom"
              placeholder="Votre nom et prénom"
              error={!!errors.bookerName}
              helperText={errors.bookerName?.message}
              required
              fullWidth
              autoComplete="name"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="bookerEmail"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Votre Email"
              placeholder="exemple@email.com"
              type="email"
              error={!!errors.bookerEmail}
              helperText={errors.bookerEmail?.message}
              required
              fullWidth
              autoComplete="email"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        {/* Téléphone */}
        <Controller
          name="bookerPhoneNumber"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <TextField
              {...field}
              value={value}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                onChange(formatted);
              }}
              label="Numéro de téléphone"
              placeholder="06 12 34 56 78"
              error={!!errors.bookerPhoneNumber}
              helperText={errors.bookerPhoneNumber?.message}
              required
              fullWidth
              autoComplete="tel"
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        {/* Nombre de personnes */}
        <Controller
          name="bookerNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombre de personnes"
              placeholder="Ex: 2, 4, 6..."
              type="number"
              error={!!errors.bookerNumber}
              helperText={errors.bookerNumber?.message}
              required
              fullWidth
              disabled={loading}
              inputProps={{ min: 1, max: 20, step: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        {/* Date */}
        <Controller
          name="bookingDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Date de votre réservation"
              type="date"
              error={!!errors.bookingDate}
              helperText={errors.bookingDate?.message}
              required
              fullWidth
              disabled={loading}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarIcon color="primary" />
                  </InputAdornment>
                )
              }}
            />
          )}
        />

        {/* Heure */}
        <Controller
          name="bookingTime"
          control={control}
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                label="Heure de votre réservation"
                type="time"
                error={!!errors.bookingTime}
                helperText={errors.bookingTime?.message}
                required
                fullWidth
                disabled={loading}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: "18:00" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon color="primary" />
                    </InputAdornment>
                  )
                }}
              />
              <Alert severity="info" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Horaires de réservation : à partir de 18h00
                </Typography>
              </Alert>
            </Box>
          )}
        />

        {/* Bouton de soumission */}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !isValid}
          fullWidth
          endIcon={<SendIcon />}
          sx={{
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: 3,
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.2s'
          }}
        >
          {loading ? "Réservation en cours..." : "Je Réserve !"}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddBookingForm;
