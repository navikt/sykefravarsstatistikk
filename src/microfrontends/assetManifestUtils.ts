import { AssetManifestParser, ManifestObject } from '@navikt/navspa/dist/async/async-navspa';
import * as http from 'http';

// TODO: koden i denne filen kommer i en senere versjon av NavSpa
//  -- koden kan da slettes når @navikt/navspa til v4.x blir tilgjengelig

export type AssetManifest = {
    files: Record<string, string>;
    entrypoints: string[];
};

export type MikrofrontendConfig = {
    appBaseUrl: string;
    isSameDomain: boolean;
};

/**
 * Extracts paths to load from a Create React App asset manifest.
 * @param manifestObject parsed json from the asset manifest
 */
function extractPathsFromCRAManifest(manifestObject: ManifestObject): string[] {
    const pathsToLoad: string[] = [];

    const { files, entrypoints } = manifestObject as {
        files: { [name: string]: string };
        entrypoints: string[];
    };

    if (files == null || typeof files !== 'object' || !Array.isArray(entrypoints)) {
        throw new Error('Invalid manifest: ' + JSON.stringify(manifestObject));
    }

    const fileList = Object.entries(files).map(([name, path]) => ({ name, path })) as {
        name: string;
        path: string;
    }[];

    entrypoints.forEach((entrypoint) => {
        const matchingFile = fileList.find((file) => file.path.endsWith(entrypoint));

        if (matchingFile) {
            pathsToLoad.push(matchingFile.path);
        } else {
            console.warn('Fant ikke fil i asset-manifest for entrypoint ' + entrypoint);
        }
    });

    return pathsToLoad;
}

export function createAssetManifestParser(
    mikrofrontendConfig: MikrofrontendConfig
): AssetManifestParser {
    return (manifestObject: ManifestObject) => {
        const pathsToLoad = extractPathsFromCRAManifest(manifestObject);
        const debugPaths = pathsToLoad.map((path) =>
            makeAbsolute(mikrofrontendConfig.appBaseUrl, path, mikrofrontendConfig.isSameDomain)
        );
        return debugPaths;
    };
}

export function makeAbsolute(
    baseUrl: string,
    maybeAbsolutePath: string,
    isSameDomain: boolean
): string {
    if (maybeAbsolutePath.startsWith('http') || isSameDomain) {
        return maybeAbsolutePath;
    }
    const url = new URL(baseUrl);
    return `${url.origin}${maybeAbsolutePath}`;
}
