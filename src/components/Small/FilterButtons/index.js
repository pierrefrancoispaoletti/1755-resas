import React from "react";
import { Button, Label } from "semantic-ui-react";
import { bookingsFilter, calculateDate } from "../../../utils/index";

import "../../styles/filterbuttons.css";

const FilterButtons = ({ setFilter, bookings }) => {
  return (
    <div className="filterbuttons">
      <div style={{ position: "relative" }}>
        <Button
          className="filterbuttons-button"
          size="massive"
          circular
          color="red"
          content="Jours Précédents"
          onClick={() => {
            setFilter(-1);
          }}
        />
        <Label
          style={{ position: "absolute", top: "-11px", left: "3px" }}
          color="blue"
          circular
        >
          {bookingsFilter(bookings, calculateDate, -1).length}
        </Label>
      </div>
      <div style={{ position: "relative" }}>
        <Button
          className="filterbuttons-button"
          size="massive"
          circular
          color="green"
          content="Aujourd'hui"
          onClick={() => {
            setFilter(0);
          }}
        />
        <Label
          style={{ position: "absolute", top: "-11px", left: "3px" }}
          color="blue"
          circular
        >
          {bookingsFilter(bookings, calculateDate, 0).length}
        </Label>
      </div>
      <div style={{ position: "relative" }}>
        <Button
          className="filterbuttons-button"
          size="massive"
          circular
          color="purple"
          content="Demain"
          onClick={() => {
            setFilter(1);
          }}
        />
        <Label
          style={{ position: "absolute", top: "-11px", left: "3px" }}
          color="blue"
          circular
        >
          {bookingsFilter(bookings, calculateDate, 1).length}
        </Label>
      </div>
      <div style={{ position: "relative" }}>
        <Button
          className="filterbuttons-button"
          circular
          size="massive"
          color="yellow"
          content="Jours Suivants"
          onClick={() => setFilter(2)}
        />
        <Label
          style={{ position: "absolute", top: "-11px", left: "3px" }}
          color="blue"
          circular
        >
          {bookingsFilter(bookings, calculateDate, 2).length}
        </Label>
      </div>
    </div>
  );
};

export default FilterButtons;
