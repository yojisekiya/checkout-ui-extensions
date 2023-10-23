import React, { useState } from "react";
import {
  reactExtension,
  TextField,
  useApplyMetafieldsChange,
  useMetafield,
  useBuyerJourneyIntercept,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  // metafields
  const METAFIELD_NAMESPACE = "RESIDENT_ID_APP";
  const METAFIELD_KEY = "resident_id";

  // states
  const [error, setError] = useState(false);
  const updateMetafield = useApplyMetafieldsChange();
  const residentIdState = useMetafield({
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
  });

  // validation
  const validateResidentId = (value) => {
    return value.length === 9;
  };
  useBuyerJourneyIntercept(() => {
    if (!validateResidentId(residentIdState.value)) {
      return {
        behavior: "block",
        reason: "Form is not valid.",
        // if a partner tries block checkout, then `perform()` does not get called and nothing happens
        // acts like `behavior: allow`
        perform: () => showValidationUI(),
      };
    } else {
      setError(false);
      return {
        behavior: "allow",
      };
    }
  });
  const showValidationUI = () => {
    console.log("validation UI");
    setError(true);
  };

  // handling errors
  const handleFieldChange = (value) => {
    if (validateResidentId(value)) {
      updateMetafield({
        type: "updateMetafield",
        namespace: METAFIELD_NAMESPACE,
        key: METAFIELD_KEY,
        valueType: "string",
        value: value,
      });
      setError(false);
    } else {
      setError(true);
    }
  };

  // rendering
  return (
    <TextField
      label="Resident ID"
      value={residentIdState?.value}
      error={error ? "Please provide a valid ID" : false}
      onChange={handleFieldChange}
    />
  );
}