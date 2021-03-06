import React from "react";
import { faRedo } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Icon } from "semantic-ui-react";

const EmptyFormButton = ({ handleEmptyForm }) => {
  return (
    <Button
      size="massive"
      circular
      color="blue"
      icon
      type="button"
      labelPosition="left"
      onClick={() => handleEmptyForm()}
    >
      <Icon>
        <FontAwesomeIcon style={{ marginTop: "5px" }} size="2x" icon={faRedo} />
      </Icon>
      Recharger
    </Button>
  );
};

export default EmptyFormButton;
