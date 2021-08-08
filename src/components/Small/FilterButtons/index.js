import React from "react";
import { Button, Label } from "semantic-ui-react";
import "../../styles/filterbuttons.css";
import { bookingsFilter, calculateDate } from "../../../utils/index";

const FilterButtons = ({ setFilter, bookings }) => {
  return (
    <div className="filterbuttons">
      <div style={{ position: "relative" }}>
        <Button
          className="filterbuttons-button"
          size="mini"
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
          size="mini"
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
          size="mini"
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
          size="mini"
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
