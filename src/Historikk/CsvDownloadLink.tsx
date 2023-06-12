import {
    HistorikkLabels,
    KvartalsvisSammenligning,
} from '../utils/sykefraværshistorikk-utils';
import React, { FunctionComponent } from 'react';
import { Label, Link } from '@navikt/ds-react';
import { FileCsvIcon } from '@navikt/aksel-icons';
import { isDefined } from '../utils/app-utils';
import { formaterProsent } from './Tabell/tabell-utils';

const buildCsvDataUrl = (
    labels: HistorikkLabels,
    data: KvartalsvisSammenligning[],
    harOverordnetEnhet: boolean
) => {
    const csvHeaders = [
        'År',
        'Kvartal',
        `Din virksomhet ${labels.virksomhet}`,
        harOverordnetEnhet ? labels.overordnetEnhet : undefined,
        `Bransje ${labels.næringEllerBransje}`,
        `Sektor ${labels.sektor}`,
        labels.land,
    ]
        .filter(isDefined)
        .join(';');

    const csvRows = data.map((rad) =>
        [
            rad.årstall,
            rad.kvartal,
            formaterProsent(rad.virksomhet),
            harOverordnetEnhet ? formaterProsent(rad.overordnetEnhet) : undefined,
            formaterProsent(rad.næringEllerBransje),
            formaterProsent(rad.sektor),
            formaterProsent(rad.land),
        ]
            .filter(isDefined)
            .join(';')
    );

    const dataUrlHeaders = 'data:text/csv;charset=utf-8,';
    const dataUrlCsv = '\uFEFF' + encodeURIComponent([csvHeaders, ...csvRows].join('\r\n'));

    return dataUrlHeaders + dataUrlCsv;
};
type CsvDownloadLinkProps = {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    harOverordnetEnhet: boolean;
    historikkLabels: HistorikkLabels;
    onClick?: () => void;
};
export const CsvDownloadLink: FunctionComponent<CsvDownloadLinkProps> = ({
    kvartalsvisSammenligning,
    harOverordnetEnhet,
    historikkLabels,
    onClick,
}) => {
    return (
        <Link
            className={'csv-download-link'}
            href={buildCsvDataUrl(
                historikkLabels,
                kvartalsvisSammenligning,
                harOverordnetEnhet
            )}
            download={`${historikkLabels.virksomhet}_Sykefraværsstatistikk.csv`}
            target={'_self'}
            onClick={onClick}
        >
            <Label size="small">
                Last ned CSV <FileCsvIcon aria-hidden="true" />
            </Label>
        </Link>
    );
};
