import { readdirSync } from 'fs';
import { join } from 'path';

export const LIBS = readdirSync(join(__dirname, '..', '..', 'libs'));
