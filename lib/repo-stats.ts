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

/**
 * Asks for the counts and never throws. A refusal (GitHub rate-limits shared
 * build machines), a dead network or a broken answer all come back as "no
 * numbers" with `ok: false`, so a page can still be built and shown.
 */
export async function loadRepoStats(ask: () => Promise<Response>): Promise<{ ok: boolean; stats: RepoStats }> {
  try {
    const response = await ask();
    if (!response.ok) return { ok: false, stats: NO_REPO_STATS };
    return { ok: true, stats: parseRepoStats(await response.json()) };
  } catch {
    return { ok: false, stats: NO_REPO_STATS };
  }
}
