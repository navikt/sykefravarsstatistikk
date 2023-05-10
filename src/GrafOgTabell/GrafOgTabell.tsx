import React, { FunctionComponent, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import { ToggleGruppePure } from 'nav-frontend-toggle';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import './GrafOgTabell.less';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { RestStatus } from '../api/api-utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import AlertStripe from 'nav-frontend-alertstriper';
import {
    getBransjeEllerNæringLabel,
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    konverterTilKvartalsvisSammenligning,
} from '../utils/sykefraværshistorikk-utils';
import { CsvDownloadLink } from './CsvDownloadLink';
import { sendKnappEvent } from '../amplitude/events';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const GrafOgTabell: FunctionComponent<Props> = (props) => {
    const { restSykefraværsstatistikk } = props;
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf' | 'tabell'>('graf');

    return (
        <div className="graf-og-tabell__wrapper">
            <div className="graf-og-tabell">
                <div className="graf-og-tabell__overdel-wrapper">
                    <div className="graf-og-tabell__tekst-wrapper">
                        <Systemtittel tag="h2" className="graf-og-tabell__tittel">
                            Se sykefraværet over tid
                        </Systemtittel>
                        <Normaltekst className="graf-og-tabell__ingress">
                            Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du kan
                            sammenligne sykefraværet deres med næringen og sektoren dere tilhører.
                        </Normaltekst>
                    </div>
                    <ToggleGruppePure
                        aria-label="Hvis du bruker skjermleser, bør du velge tabell"
                        className="graf-og-tabell__knapper"
                        toggles={[
                            {
                                children: 'Graf',
                                pressed: grafEllerTabell === 'graf',
                                onClick: () => setGrafEllerTabell('graf'),
                            },
                            {
                                children: 'Tabell',
                                pressed: grafEllerTabell === 'tabell',
                                onClick: () => {
                                    setGrafEllerTabell('tabell');
                                },
                            },
                        ]}
                    />
                </div>
                <div className="graf-og-tabell__innhold">
                    <GrafOgTabellInnhold
                        restSykefraværsstatistikk={restSykefraværsstatistikk}
                        grafEllerTabell={grafEllerTabell}
                    />
                </div>
            </div>
        </div>
    );
};

type GrafOgTabellInnholdProps = {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
    grafEllerTabell: 'graf' | 'tabell';
};
const GrafOgTabellInnhold = ({
    restSykefraværsstatistikk,
    grafEllerTabell,
}: GrafOgTabellInnholdProps) => {
    switch (restSykefraværsstatistikk.status) {
        case RestStatus.LasterInn:
        case RestStatus.IkkeLastet: {
            return (
                <div className="graf-og-tabell__spinner">
                    <NavFrontendSpinner type={'XXL'} />
                </div>
            );
        }

        case RestStatus.Feil:
        case RestStatus.IkkeInnlogget:
        case RestStatus.IngenTilgang: {
            return (
                <AlertStripe type="feil" className="graf-og-tabell__feilside">
                    Det skjedde en feil da vi prøvde å hente statistikken.
                </AlertStripe>
            );
        }

        case RestStatus.Suksess: {
            const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
            const bransjeEllerNæringLabel = getBransjeEllerNæringLabel(
                restSykefraværsstatistikk.data
            );
            const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
            const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
                restSykefraværsstatistikk.data
            );
            const kvartalsvisSammenligningReversed = kvartalsvisSammenligning.toReversed();

            const GrafEllerTabell =
                grafEllerTabell === 'graf' ? (
                    <Graf
                        kvartalsvisSammenligning={kvartalsvisSammenligning}
                        bransjeEllerNæringLabel={bransjeEllerNæringLabel}
                        historikkLabels={historikkLabels}
                    />
                ) : (
                    <Tabell
                        kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                        historikkLabels={historikkLabels}
                        bransjeEllerNæringLabel={bransjeEllerNæringLabel}
                        harOverordnetEnhet={harOverordnetEnhet}
                    />
                );

            return (
                <>
                    {GrafEllerTabell}
                    <CsvDownloadLink
                        kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                        harOverordnetEnhet={harOverordnetEnhet}
                        bransjeEllerNæringLabel={bransjeEllerNæringLabel}
                        historikkLabels={historikkLabels}
                        onClick={() => sendKnappEvent('last ned csv')}
                    />
                </>
            );
        }
    }
};

export default GrafOgTabell;
