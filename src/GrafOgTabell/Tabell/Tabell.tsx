import React, { FunctionComponent } from 'react';
import { BodyShort, Label, Table } from '@navikt/ds-react';
import Tabellrader from './Tabellrader';
import {
    BransjeEllerNæringLabel,
    getBransjeEllerNæringLabel,
    getHistorikkLabels,
    historikkHarOverordnetEnhet,
    HistorikkLabels,
    konverterTilKvartalsvisSammenligning,
    KvartalsvisSammenligning,
} from '../../utils/sykefraværshistorikk-utils';
import { RestSykefraværshistorikk } from '../../api/kvartalsvis-sykefraværshistorikk-api';
import { RestStatus } from '../../api/api-utils';

export interface TabellProps {
    kvartalsvisSammenligning: KvartalsvisSammenligning[];
    harOverordnetEnhet: boolean;
    bransjeEllerNæringLabel: BransjeEllerNæringLabel;
    historikkLabels: HistorikkLabels;
}

const Tabell: FunctionComponent<TabellProps> = ({
    kvartalsvisSammenligning,
    historikkLabels,
    bransjeEllerNæringLabel,
    harOverordnetEnhet,
}) => {
    const headerOverordnetEnhet = () => {
        if (harOverordnetEnhet) {
            return (
                <Table.HeaderCell scope="col" align="right">
                    <Label size="small">Overordnet enhet</Label>
                    <BodyShort size="small">{historikkLabels.overordnetEnhet}</BodyShort>
                </Table.HeaderCell>
            );
        }
    };

    return (
        <div className="graf-tabell__wrapper">
            <Table zebraStripes={true}>
                <Table.Header>
                    <Table.Row>
                        <BodyShort size="small">
                            <Table.HeaderCell scope={'col'}>År</Table.HeaderCell>
                        </BodyShort>
                        <BodyShort size="small">
                            <Table.HeaderCell scope="col">Kvartal</Table.HeaderCell>
                        </BodyShort>
                        <Table.HeaderCell scope="col" align="right">
                            <Label size="small">Din virksomhet</Label>{' '}
                            <BodyShort size="small">{historikkLabels.virksomhet}</BodyShort>
                        </Table.HeaderCell>
                        {headerOverordnetEnhet()}
                        <Table.HeaderCell scope="col" align="right">
                            <Label size="small">{bransjeEllerNæringLabel}</Label>{' '}
                            <BodyShort size="small">{historikkLabels.næringEllerBransje}</BodyShort>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="right">
                            <Label size="small">Sektor</Label>{' '}
                            <BodyShort size="small">{historikkLabels.sektor}</BodyShort>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" align="right">
                            <BodyShort size="small">{historikkLabels.land}</BodyShort>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        <Tabellrader
                            kvartalsvisSammenligning={kvartalsvisSammenligning}
                            harOverordnetEnhet={harOverordnetEnhet}
                        />
                    }
                </Table.Body>
            </Table>
        </div>
    );
};

export function hentTabellProps(
    restSykefraværsstatistikk: RestSykefraværshistorikk
): TabellProps | undefined {
    if (restSykefraværsstatistikk.status === RestStatus.Suksess) {
        const harOverordnetEnhet = historikkHarOverordnetEnhet(restSykefraværsstatistikk.data);
        const bransjeEllerNæringLabel = getBransjeEllerNæringLabel(restSykefraværsstatistikk.data);
        const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
        const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
            restSykefraværsstatistikk.data
        );
        const kvartalsvisSammenligningReversed = kvartalsvisSammenligning.toReversed();

        return {
            harOverordnetEnhet,
            bransjeEllerNæringLabel,
            historikkLabels,
            kvartalsvisSammenligning: kvartalsvisSammenligningReversed,
        };
    }
}

export default Tabell;
