import {default as React, FunctionComponent} from 'react';
import {logger, predefinerteFeilmeldinger} from "../utils/logger";

export const Forside: FunctionComponent = (props) => {
  return (
      <div className="forside__wrapper">
        <div className="forside">{props.children}</div>
      </div>
  );
};
