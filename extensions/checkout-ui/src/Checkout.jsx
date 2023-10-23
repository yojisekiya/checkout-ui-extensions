import React, { useState } from "react";
import {
  reactExtension,
  TextField,
  useApplyMetafieldsChange,
  useMetafield,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const METAFIELD_NAMESPACE = "RESIDENT_ID_APP";
  const METAFIELD_KEY = "resident_id";

  const [error, setError] = useState(false);
  const updateMetafield = useApplyMetafieldsChange();

  const residentIdState = useMetafield({
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
  });
  const handleFieldChange = (value) => {
    updateMetafield({
      type: "updateMetafield",
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
      valueType: "string",
      value: value,
    });
  };
  return (
    <TextField
      label="Resident ID"
      value={residentIdState?.value}
      error={error ? "error" : false}
      onChange={handleFieldChange}
    />
  );
}