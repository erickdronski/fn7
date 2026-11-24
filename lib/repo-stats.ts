export type RepoStats = { stars: number | null; forks: number | null; openIssues: number | null };

export const NO_REPO_STATS: RepoStats = { stars: null, forks: null, openIssues: null };

function count(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

/** Reads the counts from a GitHub repository response. Anything unexpected becomes null, never zero. */
export function parseRepoStats(json: unknown): RepoStats {
  if (typeof json !== "object" || json === null) return NO_REPO_STATS;
  const repo = json as Record<string, unknown>;
  return {
    stars: count(repo.stargazers_count),
    forks: count(repo.forks_count),
    openIssues: count(repo.open_issues_count),
  };
}
