import React, { FunctionComponent } from 'react';
import næringEllerBransjeIkonSvg from './næring-eller-bransje-ikon.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './DinNæringEllerBransje.less';
import { RestSummertSykefraværshistorikk, Statistikkategori } from '../../../api/summert-sykefraværshistorikk-api';
import { RestStatus } from '../../../api/api-utils';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';

interface Props {
    restSummertSykefraværshistorikk: RestSummertSykefraværshistorikk;
}

export const DinNæringEllerBransje: FunctionComponent<Props> = ({
    restSummertSykefraværshistorikk,
}) => {
    if (restSummertSykefraværshistorikk.status !== RestStatus.Suksess) {
        return null;
    }

    const dataForBransje = restSummertSykefraværshistorikk.data.find(
        (data) => data.type === Statistikkategori.BRANSJE
    );
    const dataForNæring = restSummertSykefraværshistorikk.data.find(
        (data) => data.type === Statistikkategori.NÆRING
    );

    let tekst;
    if (dataForBransje) {
        tekst = (
            <>
                <strong>Du tilhører bransjen:</strong> {dataForBransje.label}
            </>
        );
    } else if (dataForNæring) {
        tekst = (
            <>
                <strong>Du tilhører næringen:</strong> {dataForNæring.label}
            </>
        );
    } else {
        return null;
    }

    return (
        <div className="din-næring-eller-bransje">
            <div className="din-næring-eller-bransje__ikon-og-tekst">
                <img
                    className="din-næring-eller-bransje__ikon"
                    src={næringEllerBransjeIkonSvg}
                    alt=""
                />
                <Normaltekst>{tekst}</Normaltekst>
            </div>
            <div
                className="din-næring-eller-bransje__lenke-wrapper"
            >
                <EksternLenke
                    href="https://www.altinn.no/skjemaoversikt/bronnoysundregistrene/samordnet-registermelding---registrering-av-nye-og-endring-av-eksisterende-foretak-og-enheter/"
                >
                    Endre næringskode i Altinn
                </EksternLenke>
                <EksternLenke
                    href="https://www.brreg.no/bedrift/naeringskoder/"
                >
                    Om næringskoder i Brønnøysundregistrene
                </EksternLenke>
            </div>
        </div>
    );
};
