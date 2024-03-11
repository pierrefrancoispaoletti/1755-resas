import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon } from "semantic-ui-react";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const EmptyFormButton = ({ handleEmptyForm }) => {
  return (
    <Button
      size='massive'
      circular
      color='blue'
      icon
      type='button'
      labelPosition='left'
      onClick={() => handleEmptyForm()}
    >
      <Icon>
        <FontAwesomeIcon
          style={{ marginTop: "5px" }}
          size='2x'
          icon={faRedo}
        />
      </Icon>
      Recharger
    </Button>
  );
};

export default EmptyFormButton;
