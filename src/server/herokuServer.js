const path = require('path');
const express = require('express');
const app = express();
const { BASE_PATH } = require('./konstanter');

const buildPath = path.join(__dirname, '../../build');

const PORT = process.env.PORT || 3000;

process.env.REACT_APP_MOCK = true;

app.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

app.get(BASE_PATH + '/*', (req, res) => {
    res.sendFile(path.resolve(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server listening on port', PORT);
});
