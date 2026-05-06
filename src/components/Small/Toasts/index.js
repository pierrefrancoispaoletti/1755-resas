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
            bottom: 20,
            left: 0,
            right: 0,
            margin: "0 12px",
            zIndex: "1000",
            display: Object.keys(message).length > 0 && message.message !== "" ? "flex": 'none',
            borderRadius: "12px",
            background: message.success  ? "#56ea65" : "#f46161"
          }}
        >
          <FontAwesomeIcon
            icon={message.success ? faCheck : faTimes}
            color={message.success ? "green" : "red"}
            size="lg"
          />
          <span style={{ display: "inline-block", alignSelf: "center", fontSize: "0.95em", paddingLeft: "10px" }}>
            {message.message}
          </span>
        </Message>
      </Transition>
    );
}

export default Toast;
