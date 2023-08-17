import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react';
import styles from './TestVersjonBanner.module.css';
import { EnvironmentContext } from '../Context/EnvironmentContext';
import { useContext } from 'react';
import { MILJØ } from '../konstanter';

const TestVersjonBanner = () => {
    const { PROD_URL, MILJØ: miljø } = useContext(EnvironmentContext);
    const erPåDevEllerLocal = miljø === MILJØ.DEV_EKSTERN || miljø === MILJØ.LOCAL;

    const prodUrl =
        PROD_URL?.length && !PROD_URL.startsWith('{{{') && !PROD_URL.endsWith('}}}')
            ? PROD_URL
            : null;

    if (!erPåDevEllerLocal) return null;

    return (
        <Alert variant="warning" size="medium" className={styles.alert}>
            <Heading spacing level="2" size="small">
                Dette er en testversjon
            </Heading>
            <BodyShort>
                Her kan du bli bedre kjent med samtalestøtte for arbeidsgiver.
                {prodUrl?.length ? (
                    <Link href={prodUrl}>Klikk her for å gå til den vanlige siden.</Link>
                ) : null}
            </BodyShort>
        </Alert>
    );
};

export default TestVersjonBanner;
