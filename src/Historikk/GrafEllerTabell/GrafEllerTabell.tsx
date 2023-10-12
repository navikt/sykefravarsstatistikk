import React from 'react';
import { KvartalsvisSykefraværshistorikk } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import Graf from './Graf/Graf';
import Tabell from './Tabell/Tabell';
import { Suksess } from '../../api/api-utils';
import {
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    konverterTilKvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { CsvDownloadLink } from '../CsvDownloadLink';
import { listFilterBuilder } from '../../utils/app-utils';
import { sendKnappEvent } from '../../amplitude/events';
import { getLinjerSomHarData } from './Graf/graf-utils';
import { HistorikkLabel, KvartalsvisSammenligning } from '../../utils/sykefraværshistorikk-utils';

const defaultLinjer: readonly HistorikkLabel[] = [
    'virksomhet',
    'overordnetEnhet',
    'næringEllerBransje',
] as const;

function useGrafLinjerSomSkalVises(kvartalsvisSammenligning: KvartalsvisSammenligning[]) {
    const linjerSomKanVises = getLinjerSomHarData(kvartalsvisSammenligning);
    const linjeFilter = listFilterBuilder(linjerSomKanVises);
    const [linjerSomSkalVises, setLinjerSomSkalVises] = React.useState<HistorikkLabel[]>(
        defaultLinjer.filter(linjeFilter)
    );

    return { linjerSomKanVises, linjerSomSkalVises, setLinjerSomSkalVises };
}

export default function GrafEllerTabell({
    restSykefraværsstatistikk,
    grafEllerTabell,
}: {
    restSykefraværsstatistikk: Suksess<KvartalsvisSykefraværshistorikk[]>;
    grafEllerTabell: string;
}) {
    const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
    const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
    const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
        restSykefraværsstatistikk.data
    );
    const kvartalsvisSammenligningReversed = [...kvartalsvisSammenligning].reverse();
    const grafLinjerSomSkalVisesResult = useGrafLinjerSomSkalVises(kvartalsvisSammenligning);

    return (
        <>
            {grafEllerTabell === 'graf' ? (
                <Graf
                    {...grafLinjerSomSkalVisesResult}
                    kvartalsvisSammenligning={kvartalsvisSammenligning}
                    historikkLabels={historikkLabels}
                />
            ) : (
                <Tabell
                    kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                    historikkLabels={historikkLabels}
                    harOverordnetEnhet={harOverordnetEnhet}
                />
            )}
            <CsvDownloadLink
                kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
                harOverordnetEnhet={harOverordnetEnhet}
                historikkLabels={historikkLabels}
                onClick={() => sendKnappEvent('last ned csv')}
            />
        </>
    );
}
