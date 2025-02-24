#!/usr/bin/env ts-node

import { readdir } from 'fs/promises';

export async function updateContent() {
  await readdir(__dirname);
}
