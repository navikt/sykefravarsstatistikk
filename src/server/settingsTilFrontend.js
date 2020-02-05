const fsExtra = require('fs-extra');

const lagSettingsfilTilFrontend = settingsPath => {
    fsExtra.ensureFile(settingsPath).then(() => {
        fsExtra.writeFileSync(
            settingsPath,
            `window.appSettings = {
                MILJO: '${process.env.NAIS_CLUSTER_NAME}',
            };`
        );
    });
};

module.exports = lagSettingsfilTilFrontend;
