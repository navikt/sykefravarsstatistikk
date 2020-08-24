import { ReactComponent as InfoCircle } from './InfoCircle.svg';
import LesMerPanel from '../../../felleskomponenter/LesMerPanel/LesMerPanel';
import { Normaltekst } from 'nav-frontend-typografi';
import EksternLenke from '../../../felleskomponenter/EksternLenke/EksternLenke';
import React, { FunctionComponent } from 'react';
import './KoronaInfotekst.less';
import classNames from 'classnames';

const KoronaInfotekst: FunctionComponent<{ className?: string }> = ({ className }) => {
    return (
        <div className={classNames('korona-infotekst', className)}>
            <div className="korona-infotekst__info-circle">
                <InfoCircle />
            </div>
            <LesMerPanel åpneLabel="Koronaepidemien og sykefraværsstatistikken" lukkLabel="Lukk">
                <Normaltekst>
                    Opplever du høyere sykefravær enn normalt i første kvartal? Økning i
                    korttidssykefraværet skyldes sannsynligvis koronaepidemien. Når din
                    sykefraværsprosent beregnes, telles permitterte med som ansatte de tre første
                    månedene av permitteringen.
                </Normaltekst>
                <Normaltekst className="korona-infotekst__lenke">
                    <EksternLenke href="https://www.nav.no/no/nav-og-samfunn/statistikk/sykefravar-statistikk/sykefravar">
                        Les mer om hvordan korona påvirker sykefraværet i Norge
                    </EksternLenke>
                </Normaltekst>
            </LesMerPanel>
        </div>
    );
};
export default KoronaInfotekst;
