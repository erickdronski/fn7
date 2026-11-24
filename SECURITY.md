# Security

## Reporting a vulnerability

Please report it privately. Don't open a public issue.

1. Go to the repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Describe what you found, how to reproduce it, and what an attacker could do with it.

The maintainer reads every report. You'll get a reply there, and credit in the fix if you want it.

## Scope

In scope:

- This repository's code.
- The official site at `fn7.ai`, once it's live.
- The `fn7.json` package format and the Gate's checks, including ways to get a hostile package past them.
- The MCP server, the REST API and the `fn7` CLI, once they exist.
- The on-chain splitter contract, once it exists.

Out of scope:

- Forks and mirrors run by other people.
- Denial of service by volume.
- Social engineering of maintainers or contributors.
- Findings that need a device or account that is already compromised.

## Where things stand

fn/7 is before launch. No payments are live, and there is no bug bounty yet. Before real money moves, the plan calls for an outside penetration test and a smart-contract audit. The security design is in the [catalog and publishing design](docs/superpowers/specs/2026-11-24-fn7-catalog-and-publishing-design.md), section 11, which also names what is still exposed.

## If you find a hostile listing

Once the market is live, every listing will have a report button. A package that carries malware, leaked secrets or instructions aimed at turning an agent against its owner is a security report, so use the private path above as well.
