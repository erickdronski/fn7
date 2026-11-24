import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { NO_REPO_STATS, loadRepoStats } from "./repo-stats";

const answer = (status: number, body: unknown) => async () => new Response(typeof body === "string" ? body : JSON.stringify(body), { status });

describe("loading repo stats", () => {
  it("reads the counts when GitHub answers", async () => {
    const result = await loadRepoStats(answer(200, { stargazers_count: 12, forks_count: 3, open_issues_count: 4 }));
    assert.deepEqual(result, { ok: true, stats: { stars: 12, forks: 3, openIssues: 4 } });
  });

  it("gives no numbers, and does not throw, when GitHub refuses with a rate limit", async () => {
    const result = await loadRepoStats(answer(403, { message: "API rate limit exceeded" }));
    assert.deepEqual(result, { ok: false, stats: NO_REPO_STATS });
  });

  it("gives no numbers, and does not throw, when the network fails", async () => {
    const result = await loadRepoStats(async () => {
      throw new TypeError("fetch failed");
    });
    assert.deepEqual(result, { ok: false, stats: NO_REPO_STATS });
  });

  it("gives no numbers, and does not throw, when the answer isn't JSON", async () => {
    const result = await loadRepoStats(answer(200, "<html>Bad gateway</html>"));
    assert.deepEqual(result, { ok: false, stats: NO_REPO_STATS });
  });
});
