export function updateVersion(
  jsonString: string,
  version: `${number}.${number}.${number}`
): string {
  return jsonString.replace(
    /"version":\s*"\d{1,2}\.\d{1,2}\.\d{1,2}"/g,
    `"version":"${version}"`
  );
}
