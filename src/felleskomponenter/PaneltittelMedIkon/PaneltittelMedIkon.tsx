import React, {FunctionComponent} from 'react';
import {Systemtittel} from 'nav-frontend-typografi';
import "./PaneltittelMedIkon.less";

interface Props {
  children: string;
  src: any;
  alt: string;
}

export const PaneltittelMedIkon: FunctionComponent<Props> = (props) => (
    <div className="paneltittel-med-ikon">
      <img className="paneltittel-med-ikon__ikon" src={props.src} alt={props.alt}/>
      <Systemtittel className="paneltittel-med-ikon__tittel" tag="h2">
        {props.children}
      </Systemtittel>
    </div>
);
