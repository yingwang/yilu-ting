export function withBasePath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//") || /^https?:\/\//.test(path)) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
