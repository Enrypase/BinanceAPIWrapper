import { PrismaClient } from "@prisma/client";
import { isAbsolute, join } from "path";

// By default, cache until the next day
export function getCacheHeaders(time?: number) {
  return new Headers({
    "Cache-Control": `max-age=${time ? time / 1000 : 3600}, public`,
    Expires: new Date(Date.now() + (time || +3600 * 1000)).toUTCString(),
  });
}

function resolveRelativeDatasourceUrl(url?: string) {
  const FILE_INDICATOR = "file:";
  if (!url?.startsWith(FILE_INDICATOR)) {
    return url;
  }

  const rawUrl = url.replace(FILE_INDICATOR, "");
  if (isAbsolute(rawUrl)) {
    return rawUrl;
  }

  const newUrl = FILE_INDICATOR + join(process.cwd(), "prisma", rawUrl);
  return newUrl;
}

let prisma: PrismaClient | null = null;
export const usePrisma = () => {
  if (!prisma)
    prisma = new PrismaClient({
      log: ["error", "warn"],
      datasourceUrl: resolveRelativeDatasourceUrl(process.env["DATABASE_URL"]),
    });
  return prisma;
};
