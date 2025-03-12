import { readdirSync } from 'fs';
import { join } from 'path';

export const LIBS = readdirSync(join(__dirname, '..', '..', 'libs'));

export const SERVICES = readdirSync(join(__dirname, '..', '..', 'services'));
