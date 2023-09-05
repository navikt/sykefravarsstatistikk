import React from 'react';
import { render, fireEvent, screen, renderHook } from '@testing-library/react';
import { LegendMedToggles } from './LegendMedToggles';
import { HistorikkLabel, HistorikkLabels } from '../../../../utils/sykefraværshistorikk-utils';
import * as hooks from '../../../../hooks/useOrgnr';
import * as amplitudeEvents from '../../../../amplitude/events';
import { heiOgHåBarnehage } from '../../../../api/mockedApiResponses/altinn-mock';
import { useAnalytics } from '../../../../hooks/useAnalytics';
import { amplitudeMock } from '../../../../api/mockedApiResponses/amplitude-mock';
import * as iatjenester from '../../../../metrikker/iatjenester';

describe('LegendMedToggles', () => {
    beforeEach(() => {
        const valgtBedriftMedSykefraværsstatistikkRettigheter =
            heiOgHåBarnehage[0].OrganizationNumber;
        jest.spyOn(hooks, 'useOrgnr').mockReturnValue(
            valgtBedriftMedSykefraværsstatistikkRettigheter
        );
        jest.spyOn(iatjenester, 'sendSykefraværsstatistikkIaMetrikk').mockReturnValue(
            Promise.resolve([])
        );
        jest.spyOn(amplitudeEvents, 'sendCheckboxLagtTil').mockReturnValue(undefined);
        jest.spyOn(amplitudeEvents, 'sendCheckboxFjernet').mockReturnValue(undefined);
    });
    const labels: HistorikkLabels = {
        virksomhet: 'Virksomhet',
        overordnetEnhet: 'Overordnet enhet',
        næringEllerBransje: 'Bransje',
        sektor: 'Sektor',
        land: 'Land',
    };

    const linjerSomKanVises: HistorikkLabel[] = [
        'virksomhet',
        'overordnetEnhet',
        'næringEllerBransje',
        'sektor',
        'land',
    ];

    it('Sjekker at elle linjer som skal vises vises', () => {
        render(
            <LegendMedToggles
                labels={labels}
                linjerSomKanVises={linjerSomKanVises}
                linjerSomSkalVises={[]}
                setLinjerSomSkalVises={() => {}}
            />
        );
        renderHook(() => useAnalytics(amplitudeMock));

        expect(screen.getByLabelText(`Virksomhet: Virksomhet`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Overordnet enhet: Overordnet enhet`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Bransje: Bransje`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Sektor: Sektor`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Land`)).toBeInTheDocument();
    });

    it('Kaller setLinjerSomSkalVises med rikgig verdi på check', () => {
        const setLinjerSomSkalVises = jest.fn();

        renderHook(() => useAnalytics(amplitudeMock));
        render(
            <LegendMedToggles
                labels={labels}
                linjerSomKanVises={linjerSomKanVises}
                linjerSomSkalVises={[]}
                setLinjerSomSkalVises={setLinjerSomSkalVises}
            />
        );

        fireEvent.click(screen.getByLabelText(`Virksomhet: Virksomhet`));

        expect(setLinjerSomSkalVises).toHaveBeenCalledWith(['virksomhet']);
    });

    it('Kaller setLinjerSomSkalVises med rikgig verdi check med eksisterende verdi', () => {
        const setLinjerSomSkalVises = jest.fn();
        renderHook(() => useAnalytics(amplitudeMock));

        render(
            <LegendMedToggles
                labels={labels}
                linjerSomKanVises={linjerSomKanVises}
                linjerSomSkalVises={['virksomhet']}
                setLinjerSomSkalVises={setLinjerSomSkalVises}
            />
        );

        fireEvent.click(screen.getByLabelText(`Overordnet enhet: Overordnet enhet`));

        expect(setLinjerSomSkalVises).toHaveBeenCalledWith(['virksomhet', 'overordnetEnhet']);
    });

    it('Kaller setLinjerSomSkalVises med rikgig verdi på uncheck', () => {
        const setLinjerSomSkalVises = jest.fn();
        renderHook(() => useAnalytics(amplitudeMock));

        render(
            <LegendMedToggles
                labels={labels}
                linjerSomKanVises={linjerSomKanVises}
                linjerSomSkalVises={['virksomhet']}
                setLinjerSomSkalVises={setLinjerSomSkalVises}
            />
        );

        fireEvent.click(screen.getByLabelText(`Virksomhet: Virksomhet`));

        expect(setLinjerSomSkalVises).toHaveBeenCalledWith([]);
    });
});
