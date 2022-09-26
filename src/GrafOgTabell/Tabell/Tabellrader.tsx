import {
  KvartalsvisSykefraværshistorikk,
  Sykefraværsprosent
} from '../../api/kvartalsvis-sykefraværshistorikk-api';
import React, {FunctionComponent} from 'react';
import {
  historikkHarOverordnetEnhet,
  konverterTilKvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';

interface Props {
  kvartalsvisSykefraværshistorikk: KvartalsvisSykefraværshistorikk[];
}

const formaterProsent = (prosent: Sykefraværsprosent): string => {
  if (prosent.erMaskert) {
    return '***';
  } else if (prosent.prosent === undefined) {
    return '';
  } else {
    return (prosent.prosent + ' %').replace('.', ',');
  }
};

const kolonneOverordnetEnhet = (
    overordnetEnhet: Sykefraværsprosent,
    harOverordnetEnhet: boolean
) => {
  if (harOverordnetEnhet) {
    return <td>{formaterProsent(overordnetEnhet)}</td>;
  }
};

const Tabellrader: FunctionComponent<Props> = (props) => {
  const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
      props.kvartalsvisSykefraværshistorikk
  );
  kvartalsvisSammenligning.reverse();
  return (
      <>
        {kvartalsvisSammenligning.map((rad) => {
          const {
            årstall,
            kvartal,
            virksomhet,
            overordnetEnhet,
            næringEllerBransje,
            sektor,
            land,
          } = rad;
          return (
              <tr key={årstall + '-' + kvartal}>
                <td>{årstall}</td>
                <td>{kvartal}</td>
                <td>{formaterProsent(virksomhet)}</td>
                {kolonneOverordnetEnhet(
                    overordnetEnhet,
                    historikkHarOverordnetEnhet(props.kvartalsvisSykefraværshistorikk)
                )}
                <td>{formaterProsent(næringEllerBransje)}</td>
                <td>{formaterProsent(sektor)}</td>
                <td>{formaterProsent(land)}</td>
              </tr>
          );
        })}
      </>
  );
};

export default Tabellrader;
