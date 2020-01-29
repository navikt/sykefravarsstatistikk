import React, { FunctionComponent } from 'react';
import KalkulatorPanel from '../Kalkulatorpanel/KalkulatorPanel';
import VideoerPanel from '../VideoerPanel/VideoerPanel';
import './KalkulatorInfoVideoerWrapper.less'
const KalkulatoInfoVidoerWrapper: FunctionComponent = () => (
    <div className="kalkulatorinfovideoerwrapper">
        <KalkulatorPanel />
        <VideoerPanel />
    </div>
);
export default KalkulatoInfoVidoerWrapper;
