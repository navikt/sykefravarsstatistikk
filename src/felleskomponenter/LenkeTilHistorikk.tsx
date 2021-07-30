import React, { FunctionComponent } from "react";
import InternLenke from "./InternLenke/InternLenke";
import { useSendEvent } from "../amplitude/amplitude";

interface Props {
    kildeSomSendesMedEvent: string
    pathname: string,
    sendEventOmråde: string,
    tekst:string
}
export const LenkeTilHistorikk: FunctionComponent<Props> = ({
    kildeSomSendesMedEvent,
  pathname,
  sendEventOmråde,
  tekst
}) => {
    const sendEvent = useSendEvent();
    return (
        <InternLenke
            pathname={pathname}
            onClick={() =>
                sendEvent(sendEventOmråde, 'klikk', { kilde: kildeSomSendesMedEvent })
            }
        >
            {tekst}
        </InternLenke>
    );
};
