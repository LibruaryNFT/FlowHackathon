import React, { useState } from "react";

export default function ToggleVisibility({ children }) {

  // React state to manage visibility
  const [show, setShow] = useState(true);

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "Hide Transaction Details" : "Show Transaction Details";

  return (
    <div className="component-container">
      {show && children}
      <button onClick={toggleShow}>{buttonText}</button>
    </div>
  );
}