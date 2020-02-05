const fsExtra = require('fs-extra');

function lagSettingsfilTilFrontend(settingsPath) {
    console.log('nå lager jeg den filen');
    fsExtra.ensureFile(settingsPath).then(f => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
                MILJO: '${process.env.NAIS_CLUSTER_NAME}',
            };`
        );
    });
}

module.exports = lagSettingsfilTilFrontend;
