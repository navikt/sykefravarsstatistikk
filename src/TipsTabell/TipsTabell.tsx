import React, { FunctionComponent, useState } from 'react';
import { getTips, Tips } from '../felleskomponenter/tips/tips';
import { SammenligningsType } from '../Forside/vurderingstekster';
import { Speedometer, SykefraværVurdering } from '../Forside/Speedometer/Speedometer';
import { TipsVisning } from '../felleskomponenter/tips/TipsVisning';
import { Select } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import { ArbeidsmiljøportalenBransje } from '../utils/bransje-utils';

const mapTilTipsliste = (tips: Tips[]) => {
    if (tips.length > 0) {
        return tips.map((tips) => <TipsVisning key={tips.id} tips={tips} />);
    } else {
        return 'Ingen tips';
    }
};

/*
* Dette er en komponent som KUN skal brukes til test.
* Den viser en oversikt over hvilke tips vi gir i de forskjellige tilfellene.
* Aktiveres ved å legge inn som route i App.tsx:
* <Route path="/tips-tabell" exact={true}><TipsTabell /></Route>
* */

export const TipsTabell: FunctionComponent = () => {
    const [bransje, setBransje] = useState<ArbeidsmiljøportalenBransje | undefined>();

    return (
        <div>
            <Select
                selected={bransje}
                label="Velg bransje"
                onChange={(event: any) => setBransje(event.target.value)}
                style={{
                    fontSize: '2rem',
                    maxWidth: '30rem',
                    height: '4rem',
                    marginTop: '1rem',
                    marginBottom: '1rem',
                }}
            >
                <option value={undefined}>Ingen bransje</option>
                <option value={ArbeidsmiljøportalenBransje.BARNEHAGER}>BARNEHAGER</option>
                <option value={ArbeidsmiljøportalenBransje.NÆRINGSMIDDELINDUSTRI}>
                    NÆRINGSMIDDELINDUSTRI
                </option>
                <option value={ArbeidsmiljøportalenBransje.SYKEHUS}>SYKEHUS</option>
                <option value={ArbeidsmiljøportalenBransje.SYKEHJEM}>SYKEHJEM</option>
                <option value={ArbeidsmiljøportalenBransje.TRANSPORT}>TRANSPORT</option>
                <option value={ArbeidsmiljøportalenBransje.BYGG}>BYGG</option>
                <option value={ArbeidsmiljøportalenBransje.ANLEGG}>ANLEGG</option>
            </Select>
            <h1 style={{ fontSize: '5rem' }}>Bransje: {bransje || 'ingen bransje'}</h1>
            <table className="graf-tabell tabell tabell--stripet tabell--border">
                <thead>
                    <tr>
                        <th scope="col">
                            <Sidetittel>Farge</Sidetittel>
                        </th>
                        <th scope="col">
                            <Sidetittel>Totalfravær</Sidetittel>
                        </th>
                        <th scope="col">
                            <Sidetittel>Korttidsfravær</Sidetittel>
                        </th>
                        <th scope="col">
                            <Sidetittel>Langtidsfravær</Sidetittel>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        SykefraværVurdering.UNDER,
                        SykefraværVurdering.MIDDELS,
                        SykefraværVurdering.OVER,
                        SykefraværVurdering.UFULLSTENDIG_DATA,
                    ].map((vurdering) => (
                        <tr key={vurdering}>
                            <td>
                                <Speedometer resultat={vurdering} />
                            </td>
                            <td>{mapTilTipsliste(getTips(SammenligningsType.TOTALT))}</td>
                            <td>{mapTilTipsliste(getTips(SammenligningsType.KORTTID))}</td>
                            <td>{mapTilTipsliste(getTips(SammenligningsType.LANGTID))}</td>
                        </tr>
                    ))}
                    ,{' '}
                </tbody>
            </table>
        </div>
    );
};
