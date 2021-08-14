import React from 'react';
import { Transition } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-duotone-svg-icons';
import { faTimes } from '@fortawesome/pro-duotone-svg-icons';

const Toast = ({message}) => {
    return (
        <Transition
        animation="jiggle"
        duration={500}
        visible={Object.keys(message).length > 0}
      >
        <Message
          style={{
            position: "fixed",
            bottom: 25,
            left: 0,
            right: 0,
            margin: "0 12px",
            zIndex: "1000",
            display: Object.keys(message).length > 0 && message.message !== "" ? "flex": 'none',
            border: "3px solid white",
            borderRadius: "50px",
            background: message.success  ? "#56ea65" : "#f46161"
          }}
        >
          <FontAwesomeIcon
            icon={message.success ? faCheck : faTimes}
            color={message.success ? "green" : "red"}
            size="2x"
          />
          <span style={{ display: "inline-block", alignSelf: "center", fontSize: "1.3em", paddingLeft: "12px" }}>
            {message.message}
          </span>
        </Message>
      </Transition>
    );
}

export default Toast;
