import React, { FunctionComponent, useState } from 'react';
import { RestSykefraværshistorikk } from '../api/kvartalsvis-sykefraværshistorikk-api';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import './Historikk.css';
import { RestStatus } from '../api/api-utils';
import { BodyShort, Loader, ToggleGroup, Heading, Alert } from '@navikt/ds-react';
import {
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    konverterTilKvartalsvisSammenligning,
} from '../utils/sykefraværshistorikk-utils';
import { CsvDownloadLink } from './CsvDownloadLink';
import { sendKnappEvent } from '../amplitude/events';

interface Props {
    restSykefraværsstatistikk: RestSykefraværshistorikk;
}

const Historikk: FunctionComponent<Props> = (props) => {
    const { restSykefraværsstatistikk } = props;
    const [grafEllerTabell, setGrafEllerTabell] = useState<'graf' | 'tabell'>('graf');

    return (
        <div className="historikk__wrapper">
            <div className="historikk">
                <div className="historikk__overdel-wrapper">
                    <div className="historikk__tekst-wrapper">
                        <Heading spacing level="2" size="medium">
                            Se sykefraværet over tid
                        </Heading>
                        <BodyShort className="historikk__ingress">
                            Se hvordan det legemeldte sykefraværet utvikler seg over tid. Du kan
                            sammenligne sykefraværet deres med næringen og sektoren dere tilhører.
                        </BodyShort>
                    </div>
                    <ToggleGroup
                        className="historikk__toggle-group"
                        defaultValue="graf"
                        aria-label="Hvis du bruker skjermleser, bør du velge tabell"
                        onChange={(value) => setGrafEllerTabell(value as 'graf' | 'tabell')}
                    >
                        <ToggleGroup.Item value="graf">Graf</ToggleGroup.Item>
                        <ToggleGroup.Item value="tabell">Tabell</ToggleGroup.Item>
                    </ToggleGroup>
                </div>
                <div className="historikk__innhold">
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
                <div className="historikk__spinner">
                    <Loader size="2xlarge" />
                </div>
            );
        }

        case RestStatus.Feil:
        case RestStatus.IkkeInnlogget:
        case RestStatus.IngenTilgang: {
            return (
                <Alert variant="error" className="historikk__feilside">
                    Det skjedde en feil da vi prøvde å hente statistikken.
                </Alert>
            );
        }

        case RestStatus.Suksess: {
            const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
            const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
            const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
                restSykefraværsstatistikk.data
            );
            const kvartalsvisSammenligningReversed = kvartalsvisSammenligning.toReversed();

            const GrafEllerTabell =
                grafEllerTabell === 'graf' ? (
                    <Graf
                        kvartalsvisSammenligning={kvartalsvisSammenligning}
                        historikkLabels={historikkLabels}
                    />
                ) : (
                    <Tabell
                        kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                        historikkLabels={historikkLabels}
                        harOverordnetEnhet={harOverordnetEnhet}
                    />
                );

            return (
                <>
                    {GrafEllerTabell}
                    <CsvDownloadLink
                        kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                        harOverordnetEnhet={harOverordnetEnhet}
                        historikkLabels={historikkLabels}
                        onClick={() => sendKnappEvent('last ned csv')}
                    />
                </>
            );
        }
    }
};

export default Historikk;
