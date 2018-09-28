import React from "react";
import { Dimmer } from 'semantic-ui-react'

function Loader({ isLoading }) {
  return (
    isLoading && (
      <Dimmer active={isLoading}>
        loading now...
         </Dimmer>
    )
  );
}

export { Loader };
