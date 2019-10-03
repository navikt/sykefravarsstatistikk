import * as React from 'react';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';

import './ekspanderbartInnhold.less';

export interface Props {
    children: React.ReactNode;
    erApen?: boolean;
    ariaLive?: 'assertive' | 'polite' | 'off';
    animert?: boolean;
    harEkspanderbartInnhold?: boolean;
}

const EkspanderbartInnhold = ({
    children,
    animert = true,
    harEkspanderbartInnhold = false,
    erApen = false,
    ariaLive = 'off',
}: Props) => {
    const content = <div aria-live={ariaLive}>{erApen ? <div>{children}</div> : <div />}</div>;
    if (!animert) {
        return content;
    }

    return (
        <Collapse
            isOpened={erApen}
            springConfig={{ stiffness: 250, damping: 30 }}
            className={classnames('ekspanderbartInnhold', {
                'ekspanderbartInnhold--apen': erApen,
            })}
            hasNestedCollapse={harEkspanderbartInnhold}
        >
            {content}
        </Collapse>
    );
};

export default EkspanderbartInnhold;
