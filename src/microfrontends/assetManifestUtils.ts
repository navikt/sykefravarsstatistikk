import { ManifestObject } from '@navikt/navspa/dist/async/async-navspa';
import { BASE_PATH } from '../konstanter';

export type AssetManifest = {
    files: Record<string, string>;
    entrypoints: string[];
};

const assetManifestParser = (manifestObject: ManifestObject): string[] => {
    const pathsToLoad: string[] = [];

    const { files, entrypoints } = manifestObject as AssetManifest;

    if (files == null || typeof files !== 'object' || !Array.isArray(entrypoints)) {
        throw new Error('Invalid manifest: ' + JSON.stringify(manifestObject));
    }

    const fileList = Object.entries(files).map(([name, path]) => ({ name, path }));

    entrypoints.forEach((entrypoint) => {
        const matchingFile = fileList.find((file) => file.path.endsWith(entrypoint));

        if (matchingFile) {
            pathsToLoad.push(matchingFile.path);
        } else {
            console.warn('Fant ikke fil i asset-manifest for entrypoint ' + entrypoint);
        }
    });

    const environmentFile = fileList.find((file) => file.name === 'env.js');
    if (environmentFile) {
        pathsToLoad.push(environmentFile.path);
    }
    console.log('pathstolLoad Før =', pathsToLoad);
    pathsToLoad.forEach((path, index) => {
        pathsToLoad[index] = BASE_PATH + path;
    });
    console.log('pathstolLoad Etter=', pathsToLoad);
    //http://localhost:3000/samtalestotte-podlet/static/media/lampe.c9551f16.svg
    pathsToLoad.push(BASE_PATH + '/samtalestotte-podlet/static/media/lampe.c9551f16.svg');
    return pathsToLoad;
};

export default assetManifestParser;
