import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './TipsBilde.less';

interface Props {
    className?: string;
    src: string;
    alt: string;
}

export const TipsBilde: FunctionComponent<Props> = ({ className, src, alt }) => (
    <div className={classNames('tips-bilde__wrapper', className)}>
        <img className="tips-bilde" src={src} alt={alt} />
    </div>
);
