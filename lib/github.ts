import { cacheLife } from "next/cache";
import { NO_REPO_STATS, parseRepoStats, type RepoStats } from "./repo-stats";
import { SITE } from "./site";

/**
 * Live counts for the repository. Cached for hours. Any failure returns
 * nulls, and the interface then shows no number at all.
 */
export async function getRepoStats(): Promise<RepoStats> {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch(SITE.repo.api, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "fn7-site" },
    });
    if (!response.ok) return NO_REPO_STATS;
    return parseRepoStats(await response.json());
  } catch {
    return NO_REPO_STATS;
  }
}
