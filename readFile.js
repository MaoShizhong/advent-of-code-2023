import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

/**
 *
 * @param {string} fileName
 * @param {string} metaURL
 * @param {string} delimiter '\n'
 * @returns string[]
 */
export const dataToStringArray = (fileName, metaURL, delimiter = '\n') => {
    const __dirname = path.dirname(fileURLToPath(metaURL));
    const dataString = readFileSync(path.join(__dirname, fileName), { encoding: 'utf8' });

    return dataString.split(delimiter);
};
