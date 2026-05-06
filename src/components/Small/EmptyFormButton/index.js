import React from "react";
import { faRedo } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon } from "semantic-ui-react";

const EmptyFormButton = ({ handleEmptyForm }) => {
  return (
    <Button
      size="medium"
      circular
      color="blue"
      icon
      type="button"
      labelPosition="left"
      onClick={() => handleEmptyForm()}
    >
      <Icon>
        <FontAwesomeIcon size="1x" icon={faRedo} />
      </Icon>
      Recharger
    </Button>
  );
};

export default EmptyFormButton;
