import { AssetManifestParser, ManifestObject } from "@navikt/navspa/dist/async/async-navspa";

export type AssetManifest = {
    files: Record<string, string>;
    entrypoints: string[];
};

/**
 * Extracts paths to load from a Create React App asset manifest.
 * @param manifestObject parsed json from the asset manifest
 */
function extractPathsFromCRAManifest(manifestObject: ManifestObject): string[] {
    const pathsToLoad: string[] = [];

    const { files, entrypoints } = manifestObject as { files: {[name: string]: string}, entrypoints: string[] };

    if ((files == null || typeof files !== 'object') || !Array.isArray(entrypoints)) {
        throw new Error('Invalid manifest: ' + JSON.stringify(manifestObject));
    }

    const fileList = Object.entries(files).map(([name, path]) => ({name, path})) as {name: string, path: string}[];

    entrypoints.forEach((entrypoint) => {
        const matchingFile = fileList.find(file => file.path.endsWith(entrypoint));

        if (matchingFile) {
            pathsToLoad.push(matchingFile.path);
        } else {
            console.warn('Fant ikke fil i asset-manifest for entrypoint ' + entrypoint);
        }
    });

    return pathsToLoad;
}
export function createAssetManifestParser(appBaseUrl: string): AssetManifestParser {
    return (manifestObject: ManifestObject) => {
        const pathsToLoad = extractPathsFromCRAManifest(manifestObject);
        const debugPaths= pathsToLoad.map(path => makeAbsolute(appBaseUrl, path));
        console.log("These arr debugpaths to load: ",debugPaths)
        return debugPaths;
    };
}

export function makeAbsolute(baseUrl: string, maybeAbsolutePath: string): string {
    if (maybeAbsolutePath.startsWith('http')) {
        console.log("maybeAbsolutePath: ",maybeAbsolutePath);
        return maybeAbsolutePath;
    }
    const url = new URL(baseUrl);
    return `${url.origin}${maybeAbsolutePath}`;
}
export default createAssetManifestParser;
