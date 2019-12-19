import { FunctionComponent, default as React } from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import './Lasteside.less';

const Lasteside: FunctionComponent = () => {
    return (
        <div className="lasteside">
            <NavFrontendSpinner type={'XXL'} />
        </div>
    );
};

export default Lasteside;
