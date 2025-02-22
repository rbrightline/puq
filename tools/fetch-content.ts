#!/usr/bin/env ts-node
const contentURL =
  'https://raw.githubusercontent.com/rbrightline/puq/refs/heads/main/content/libs.json';

async function fetchContent() {
  const res = await fetch(contentURL);

  return await res.json();
}

fetchContent().then(console.log);
