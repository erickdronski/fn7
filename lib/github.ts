import { cacheLife } from "next/cache";
import { NO_REPO_STATS, parseRepoStats, type RepoStats } from "./repo-stats";
import { SITE } from "./site";

/** Cached for hours when GitHub answers. A failure throws, so it is never cached. */
async function fetchRepoStats(): Promise<RepoStats> {
  "use cache";
  cacheLife("hours");
  const response = await fetch(SITE.repo.api, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "fn7-site" },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`);
  return parseRepoStats(await response.json());
}

/**
 * Live counts for the repository. If GitHub is slow, down or rate-limited,
 * this returns nulls and the interface shows no number at all. The next
 * request tries again.
 */
export async function getRepoStats(): Promise<RepoStats> {
  try {
    return await fetchRepoStats();
  } catch {
    return NO_REPO_STATS;
  }
}
