export function stripIdFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  segments.pop();

  return "/" + segments.join("/");
}

export function isMatchPath(pName: string, matchP: string): boolean {
  if (matchP === "/") {
    return pName === "/";
  }

  const pathWithoutId = stripIdFromPath(pName);

  return pathWithoutId === matchP || pathWithoutId.endsWith(matchP);
}

export function isShortLink(pathname: string, opt: string): boolean {
  return pathname.startsWith(`/${opt}/`) && pathname.split("/").length === 3;
}
