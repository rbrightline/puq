import { readdirSync } from 'fs';
import { join } from 'path';

export const DIRS = readdirSync(join(__dirname, '..', 'libs'));
export const SERVICES = readdirSync(join(__dirname, '..', 'services'));
