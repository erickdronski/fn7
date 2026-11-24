# fn/7 launch playbook

Written 2026-11-24. Nothing is for sale yet. Each step names the milestone that makes it true. Venues are listed from memory, and timing choices are judgment calls.

## 1. The pitch

> fn/7 is an open-source marketplace where AI agents and people buy skills, code, courses and tools straight from creators, who keep 90% of every sale.

Use it word for word. Three proof points from the design:

1. **Creators keep 90%.** Every sale, every price tier, every way to pay. fn/7 keeps 10%: 9% runs the market, 1% goes to a public open-source fund.
2. **Built for agents.** MCP over Streamable HTTP, and REST with an OpenAPI 3.1 spec. An agent searches, buys and installs under a cap its owner set.
3. **Every release is scanned, reviewed and signed.** A release that passes the Gate gets an Ed25519-signed attestation in a public transparency log.

Lead with this: **a high price carries proof.** Prices are fixed tiers from Free to $500. A new booth can use $1, $3 and $5. Rank opens the rest, and rank is earned by settled sales and by buying and opening other creators' goods. The $100 to $500 tiers need 250 settled sales to 100 buyers.

## 2. Who it is for

**People who build with AI agents.** Tell them: one MCP URL, a spending cap they set, and an attestation their agent can verify before installing.

**Creators with something small to sell.** Tell them: you keep 90%, a verified booth lists at $1 to $5 from day one, and earned rank opens higher price tiers. US-based creators only at launch.

**Open-source contributors.** Tell them: AGPL-3.0-or-later, a public roadmap, and the Builder badge for a merged pull request. No share of sales.

## 3. Four phases

**Build in public (now, until M1 and M2 work)**

**Goal:** stars, forks, and people saying what they would sell or buy. Until accounts exist, a star or a Discussion reply is the sign-up. **Ship:** milestones, a true README, good first issues. **Post:** the scene, one rule at a time, what shipped. Always say nothing is for sale yet.

**Genesis (private alpha, needs M1 to M3; agents need M5)**

**Goal:** the first 100 Live booths, which earn the Genesis badge, and the first connected agents. **Ship:** publishing, the Gate, attestations. Record the order booths go Live, because badges arrive in M6. **Post:** Gate results, first releases (with permission), what feedback changed.

**Launch day (buying works end to end)**

**Goal:** sign-ups, first purchases, agents buying inside their caps. **Ship:** live checkout, after the design's required outside reviews: a penetration test, a lawyer, and a contract audit before on-chain payments. **Post:** the launch thread, Show HN, the venues in section 5.

**After launch (first 30 days)**

**Goal:** settled sales, repeat buyers, booths reaching Relay rank. **Ship:** fast fixes, a weekly changelog, the next milestone. **Post:** real numbers weekly, first rank-ups, contributors by name. Early settled counts are zero, because a sale settles after 14 days.

## 4. X playbook

**Pillars:** the pixel market scene, the rules (one checkable rule per post, linked to the design), the build log, agents buying (from M5), and people (named with permission).

**Weekly cadence** (a starting point): Monday a build log with a screen recording under 20 seconds, Tuesday one rule, Wednesday a scene clip, Thursday an open issue, Friday the changelog. Reply daily in threads about MCP, agent skills and creator fees.

No hashtags, no emoji. Lead with a recording or the scene still.

**Drafts.** Post each only when its condition is true.

**1. Intro (now).** Visual: the camera descending to the market.
> fn/7 is an open-source marketplace where AI agents and people buy skills, code, courses and tools straight from creators, who keep 90% of every sale.
>
> Nothing is for sale yet. The design is written and the landing page is built. I'm building the rest in public. github.com/erickdronski/fn7

**2. Rank and price tiers (now).** Visual: the tier ladder.
> On most markets anyone can type $500. In fn/7's design you can't.
>
> A new booth prices at $1, $3 or $5. Higher price tiers open with rank, and rank comes from settled sales and from buying other creators' goods. The $500 tier needs at least 250 settled sales to 100 buyers.
>
> A high price carries proof. Not built yet. [design link, section 8]

**3. The Gate (now).** Visual: crates passing the arch.
> Crates rise through this arch and get scanned. Most pass. Some turn red and drop.
>
> That arch is the Gate. Every release will pass it before it is public: a security scan, a prompt-injection scan, a quality review, and a human reviewer where risk is higher. Designed, not built yet.

**4. The fee (now).**
> The fee in fn/7's design: creators 90%, running the market 9%, a public open-source fund 1%. Same at every price tier and every way to pay. It's a tested rule in the repo. Think it's wrong? Open an issue.

**5. Contributors (once good first issues are open).**
> fn/7 is AGPL-3.0-or-later. Eleven milestones, and M0 is in progress. Start with an issue labeled good first issue. A merged pull request earns the Builder badge once accounts exist. It doesn't earn a share of sales.

**6. Milestone (when M1 is live; reuse the shape).** Visual: a sign-in recording.
> M1 is live: accounts. Sign in with email, a passkey, Google, GitHub or a wallet, and pick a pixel avatar. You still can't buy or sell. Next: the catalog.

**7. Genesis call (when M3 works).**
> Genesis is open. The first 100 booths to go Live earn the Genesis badge. Live means a release of yours passed the Gate.
>
> You get a booth, the badge, and a direct line to me while the product can still change. No real money moves yet. US-based creators only for now. Reply with what you'd list.

**8. Launch thread (when buying works end to end).** Delete any line whose milestone has not shipped.
> 1/ fn/7 is open. [the one-line pitch] [recording: an agent searches, buys, installs]
>
> 2/ For agents: one MCP URL, or a REST API. Your agent searches by task, checks a listing before buying, and pays under a cap you set.
>
> 3/ For creators: 90% of every sale. 9% runs the market. 1% goes to a public open-source fund.
>
> 4/ Every release passes the Gate first. A pass is an Ed25519-signed attestation in a public transparency log.
>
> 5/ Prices are fixed tiers, Free to $500. New booths start at $1, $3 and $5. Rank opens the rest, earned by settled sales and by buying from others. A high price carries proof.
>
> 6/ Not here yet: [what is still on the roadmap]. AGPL-3.0-or-later. Star it, fork it, open an issue: github.com/erickdronski/fn7

## 5. Stars and forks, the legitimate way

**README.** Scene at the top, a true status line, and how to help within one screen.

**First issues.** Keep open issues labeled `good first issue`, each naming the file to touch and what done looks like. Answer first pull requests within a day.

**Where to submit**
- **Hacker News, "Show HN".** At launch only. Show HN is for things people can try, not landing pages.
- **Product Hunt.** A week later, so one person can answer both crowds. Verify first: launch rules.
- **Reddit.** r/mcp, r/ClaudeAI, r/AI_Agents, r/opensource, r/SideProject. Verify first: each self-promotion rule.
- **Awesome lists.** punkpeye/awesome-mcp-servers, wong2/awesome-mcp-servers, e2b-dev/awesome-ai-agents, hesreallyhim/awesome-claude-code. Verify first: each still merges pull requests.
- **MCP registries and directories (from M5).** The official MCP Registry, which the design names. Then Smithery, Glama, PulseMCP and mcp.so. Verify first: Cursor Directory and the GitHub MCP Registry.
- **Newsletters and podcasts.** Latent Space, TLDR AI, Ben's Bites, Console, Changelog News, Practical AI, PulseMCP's newsletter. Verify first: whether each takes submissions.

## 6. Getting creators and agents

**The Genesis 100.** Look for people who publish small digital goods: skills, MCP servers, prompts, templates, short courses. Write to each one yourself and name what of theirs you'd want listed.

Offer only what the design supports:
- The Genesis badge, for the first 100 Live booths.
- A booth with five layouts. Its pixel booth grows with rank once M6 ships.
- A human reviewer on their first three listings, with Gate notes in plain words.
- Early feedback that shapes the product.

Don't offer landing-page featuring (that is Nexus rank), a different fee, or promised sales.

**Agents.** List the MCP server in the official MCP Registry and the directories above. Keep `llms.txt` pointing at the MCP URL and the API spec. Ship setup tabs for Claude, ChatGPT, Cursor, VS Code and Windsurf. Ask early agent owners for compatibility reports.

## 7. Launch-day runbook

Times are US Eastern, midweek. A judgment call.

- **Day before.** Freeze deploys. Buy, install and refund one good as a person, then as an agent. Confirm the outside reviews are done.
- **07:00** Smoke test again.
- **08:00** Update the README status line and roadmap.
- **09:00** Post the launch thread on X and pin it.
- **09:15** Submit Show HN. First comment: what it is, what isn't built, what feedback you want. Don't ask for upvotes.
- **10:00** Email Genesis creators their booth links.
- **10:00 to 13:00** Answer every comment. File bugs as issues. No risky deploys.
- **13:00** Post to one or two subreddits.
- **15:00** Test every directory listing and setup tab.
- **17:00** Post a plain update: what broke, what got fixed.
- **21:00** Triage issues, thank contributors by name, write down the day's numbers. Stop.

## 8. What to measure

No targets. Watch the weekly trend and the drop from one step to the next.

**Build in public.** Stars, forks and unique cloners. Issues and Discussions from strangers. First merged pull requests from new contributors. Working if a post moves the counts.

**Genesis.** Booths verified. Releases submitted to the Gate. Gate pass rate: Live releases divided by submitted ones. Time from sign-up to submitted (the design's goal: under ten minutes). Agents that pass a connection test. Working if creators submit a second release unasked.

**Launch day.** Sign-ups. First purchases. Time from landing page to first purchase (the design's goal: under two minutes). Agent purchases. Error rate. Working if strangers finish a purchase without help.

**First 30 days.** Settled sales (14 days old, no refund). Different buyers per booth. Repeat buyers. Refund rate. Booths reaching Relay rank. Working if settled sales and repeat buyers rise while refunds hold.

## 9. What not to do

- **Bought or botted stars.** GitHub removes them, and anyone can read the stargazer list.
- **Engagement pods.** Hacker News penalizes voting rings, and pod members never buy.
- **Fake reviews.** They break the trust the Gate exists to earn, and the FTC bans them.
- **Invented user counts.** An anti-goal in the design. One caught number discredits every true one.
- **Claims before they are true.** Agents read claims as data and act on them.
- **Token hype.** A token is a non-goal. Crypto here is a way to pay, and token talk draws speculators, not buyers.

## 10. What Erick needs to prepare

**Accounts:** an X account with the one-line pitch as its bio. The GitHub repo public, with Discussions on. `fn7.ai` live. Hacker News, Product Hunt and Reddit accounts with real history before launch day. Publisher access to the official MCP Registry (M5).

**Assets:** the scene poster still. Three recordings under 20 seconds: the camera descent, the Gate arch, the tier ladder. A list of creators to invite.

**First week**
1. Claim the X handle and pin draft 1.
2. Record the three clips and put the scene at the top of the README.
3. Open and label good first issues.
4. Start a Discussion: "What would you sell on fn/7?"
5. Post drafts 2, 3 and 4 on separate days.
6. Write down stars, forks and cloners as the baseline.
