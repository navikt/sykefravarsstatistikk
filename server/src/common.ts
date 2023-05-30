import path from "path";
import { fileURLToPath } from "node:url";

export const BASE_PATH = '/sykefravarsstatistikk';
export const buildPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../build');
