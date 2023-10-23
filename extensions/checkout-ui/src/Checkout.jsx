import React, { useState } from "react";
import {
  reactExtension,
  TextField,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const [error, setError] = useState(false);
  const [residentID, setResidentID] = useState("");
  const handleFieldChange = (value) => {
    setResidentID(value);
  };
  return (
    <TextField
      label="Resident ID"
      value={residentID}
      error={error ? "Please provide a valid ID" : false}
      onChange={handleFieldChange}
    />
  );
}