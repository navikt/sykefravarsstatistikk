import {FunctionComponent, useContext, useEffect} from 'react';
import {
  BrødsmulestiConfig,
  finnBrødsmule,
  getBrødsmulesti, getdefaultBrødsmulestiConfig,
  medOrgnrQuery,
} from './brødsmulesti-utils';
import {onBreadcrumbClick, setBreadcrumbs} from '@navikt/nav-dekoratoren-moduler';
import {useNavigate} from 'react-router-dom';
import {BASE_PATH} from '../konstanter';
import {useOrgnr} from '../hooks/useOrgnr';
import {EnvironmentContext} from "../Context/EnvironmentContext";

interface Props {
  gjeldendeSide: string;
  config?: BrødsmulestiConfig;
}

const Brødsmulesti: FunctionComponent<Props> = (props) => {
  const {gjeldendeSide} = props;
  const navigate = useNavigate();
  const orgnr = useOrgnr();
  const { MIN_SIDE_ARBEIDSGIVER_URL } = useContext(EnvironmentContext)

  useEffect(() => {
    const defaultBrødsmulestiConfig = getdefaultBrødsmulestiConfig(MIN_SIDE_ARBEIDSGIVER_URL);
    const config = props.config
        ? {...defaultBrødsmulestiConfig, ...props.config}
        : defaultBrødsmulestiConfig;

    const gjeldendeSmule = finnBrødsmule(gjeldendeSide, config);

    const brødsmulesti = getBrødsmulesti(gjeldendeSmule, config);

    setBreadcrumbs(
        brødsmulesti.map((smule) => ({
          url: medOrgnrQuery(smule.href, orgnr),
          title: smule.lenketekst,
          handleInApp: smule.handleMedReactRouter,
        }))
    );

    onBreadcrumbClick((breadcrumb) => {
      navigate(breadcrumb.url.replace(BASE_PATH, ""))
    });
  }, [props.config, gjeldendeSide, navigate, orgnr, MIN_SIDE_ARBEIDSGIVER_URL]);

  return null;
};

export default Brødsmulesti;
