import React from "react";
import { Box, Chip, Stack } from "@mui/material";
import {
  History as HistoryIcon,
  Today as TodayIcon,
  NavigateNext as TomorrowIcon,
  Event as EventIcon
} from "@mui/icons-material";
import { bookingsFilter, calculateDate } from "../../../utils/index";

const FilterButtons = ({ setFilter, bookings, currentFilter }) => {
  const filters = [
    {
      label: "Jours Précédents",
      value: -1,
      color: "error",
      icon: <HistoryIcon />
    },
    {
      label: "Aujourd'hui",
      value: 0,
      color: "success",
      icon: <TodayIcon />
    },
    {
      label: "Demain",
      value: 1,
      color: "secondary",
      icon: <TomorrowIcon />
    },
    {
      label: "Jours Suivants",
      value: 2,
      color: "warning",
      icon: <EventIcon />
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center'
        }}
      >
        {filters.map((filter) => {
          const count = bookingsFilter(bookings, calculateDate, filter.value).length;
          const isActive = currentFilter === filter.value;

          return (
            <Chip
              key={filter.value}
              label={`${filter.label} (${count})`}
              icon={filter.icon}
              onClick={() => setFilter(filter.value)}
              color={filter.color}
              variant={isActive ? "filled" : "outlined"}
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                fontWeight: isActive ? 700 : 500,
                py: 2.5,
                px: 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                },
                ...(isActive && {
                  boxShadow: 3
                })
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default FilterButtons;
