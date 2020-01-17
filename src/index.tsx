import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.less';

if (process.env.REACT_APP_MOCK) {
    console.log('========================================');
    console.log('=============== MED MOCK ===============');
    console.log('===DETTE SKAL DU IKKE SE I PRODUKSJON===');
    console.log('========================================');
    require('./mocking/mock');
}

ReactDOM.render(<App />, document.getElementById('root'));
