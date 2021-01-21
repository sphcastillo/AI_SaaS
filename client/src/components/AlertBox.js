import React, { useState, useEffect } from "react";

function AlertBox(props) {
  const [opacity, setOpacity] = useState(0)

  let styles = {
    div: {
      'borderColor': 'black',
      'borderWidth': '2px',
      'borderRadius': '5px',
      'backgroundColor': 'rebeccapurple',
      'padding': '10px',
      'color': 'antiquewhite',
      // the opacity variable can be set: if opacity is 1, the alert box is visible.
      // If opacity is 0, the alert box is transparent.
      opacity: opacity,
      margin: '2px'
    }
  }

  useEffect(() => {
    // This useEffect hook makes the alert box appear if there is a message:
    if (props.message !== '') {
      setOpacity(1)
    }
    // if the message is blank, then the opacity becomes transparent:
    if (props.message === '') {
      setOpacity(0);
    }
    // The useEffect hook runs whenever a variable in the dependency array changes (props.message in this case).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.message]);


  return (
    <div style={styles.div}>
      {props.message}
    </div>
  )
}

export default AlertBox;
