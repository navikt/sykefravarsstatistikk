import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';

const App: React.FC = () => {
    return (
        <>
            <h1 className="tittel">Dette er sykefraværsstatistikk</h1>
            <Ekspanderbartpanel tittel="Thomas er tøff">
                Lars ANdreas er enda tøffere
            </Ekspanderbartpanel>
        </>
    );
};

export default App;
