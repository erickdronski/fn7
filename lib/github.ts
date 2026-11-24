import { cacheLife } from "next/cache";
import { loadRepoStats, type RepoStats } from "./repo-stats";
import { SITE } from "./site";

/**
 * Live counts for the repository. A good answer is kept for hours. If GitHub
 * is slow, down or rate-limited, this returns nulls, the interface shows no
 * number at all, and the miss is kept only for minutes so the next visit tries
 * again. It never throws: a build must not fail because GitHub said no.
 */
export async function getRepoStats(): Promise<RepoStats> {
  "use cache";
  const { ok, stats } = await loadRepoStats(() =>
    fetch(SITE.repo.api, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "fn7-site" },
      signal: AbortSignal.timeout(5000),
    }),
  );
  if (ok) cacheLife("hours");
  else cacheLife("minutes");
  return stats;
}
