import React, {createContext, FunctionComponent, useState} from 'react';
import {IaTjenesteKilde} from "./iatjenester";

export interface TjenestePerOrgnr {
  orgnr: string;
  kilde: string;
}

export const iaTjenesterMetrikkerContext = createContext<{
  bedrifterSomHarSendtMetrikker: [TjenestePerOrgnr];
  setBedrifterSomHarSendtMetrikker: (bedrifter: [TjenestePerOrgnr]) => void;
}>({
  bedrifterSomHarSendtMetrikker: [{orgnr: '', kilde: 'SYKEFRAVÆRSSTATISTIKK'}],
  setBedrifterSomHarSendtMetrikker: () => {
  },
});

export const IaTjenesterMetrikkerContextProvider: FunctionComponent = (props) => {
  const [bedrifterSomHarSendtMetrikker, setBedrifterSomHarSendtMetrikker] = useState<[TjenestePerOrgnr]>([{
    orgnr: '',
    kilde: IaTjenesteKilde.SYKEFRAVÆRSSTATISTIKK
  }]);

  const Provider = iaTjenesterMetrikkerContext.Provider;
  return (
      <Provider
          value={{
            bedrifterSomHarSendtMetrikker,
            setBedrifterSomHarSendtMetrikker,
          }}
      >
        {props.children}
      </Provider>
  );
};
