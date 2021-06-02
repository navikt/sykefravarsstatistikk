import { ReactComponent as InfoCircle } from './InfoCircle.svg';
import LesMerPanel from '../../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../../../../felleskomponenter/EksternLenke/EksternLenke';
import React, { FunctionComponent } from 'react';
import './EndringISykefraværsstatistikkenInfotekst.less';
import classNames from 'classnames';

const EndringISykefravRsstatistikkenInfotekst: FunctionComponent<{ className?: string }> = ({ className }) => {
    return (
        <div className={classNames('endring-i-sykefraværsstatistikken-infotekst', className)}>
            <div className="endring-i-sykefraværsstatistikken-infotekst__info-circle">
                <InfoCircle />
            </div>
            <LesMerPanel åpneLabel="Har din sykefraværsstatistikk endret seg fra siste gang du besøkte siden?">
                <Normaltekst>
                    Statistisk sentralbyrå endrer metoden for å beregne stillingsprosent.
                    For noen vil dette kunne påvirke beregningen av sykefraværsprosenten.
                </Normaltekst>
                <Normaltekst>
                    Endringen kom 1.kvartal 2021. Alle tall i sykefraværshistorikken din er oppdatert med ny beregningsmetode for stillingsprosent.
                </Normaltekst>
                <Normaltekst className="korona-infotekst__lenke">
                    <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/relatert-informasjon/endringer-i-sykefravaersstatistikken-fra-og-med-1.kvartal-2021">
                        Les mer om endringene på statistikksidene på nav.no
                    </EksternLenke>
                </Normaltekst>
            </LesMerPanel>
        </div>
    );
};
export default EndringISykefravRsstatistikkenInfotekst;
