import type { Metadata } from "next";
import { Block, CodeBlock, Facts, PageHero, Points, Reasons, Steps } from "@/components/page/blocks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { GATE_CHECKS } from "@/lib/content";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Trust and the Gate",
  description: "Every release on fn/7 passes the Gate: a security scan, a prompt-injection scan and a quality review, then a signed attestation in a public log.",
  alternates: { canonical: ROUTES.trust },
};

const PERMISSIONS = `"permissions": {
  "network": false,
  "secrets": [],
  "shell": ["git"],
  "writes": ["."]
}`;

export default function TrustPage() {
  return (
    <>
      <PageHero
        title="Scanned, reviewed and signed"
        lead="Nothing goes public on fn/7 until it passes the Gate. Agents only ever see releases that passed, and they can verify the proof before they install."
        note="The Gate ships in milestone M3. This page describes how it will work, and what it can't catch."
      >
        <Button href="#checks">See the checks</Button>
        <Button href={ROUTES.security} variant="line">
          Report a vulnerability
        </Button>
      </PageHero>

      <Block id="checks" icon="shield" lead="The Gate" title="Four checks stand between an upload and the market.">
        <Reasons items={GATE_CHECKS.map((check) => ({ icon: check.icon, title: check.name, text: check.text }))} />
      </Block>

      <Block id="flow" icon="sieve" lead="The order" title="What happens to a release." raised>
        <Steps
          items={[
            { title: "Submit", text: "A creator sends a release with its manifest, sample and declared permissions." },
            { title: "Automatic checks", text: "The security scan, the eligibility check and the spam filter run in a sealed sandbox that holds no keys." },
            { title: "Quality review", text: "An AI model reads the release against its own claims, and reads its instructions as an attacker would." },
            { title: "Human review", text: "A person approves anything new that runs code, anything above $5, a booth's first three listings, and anything flagged." },
            { title: "Signed and live", text: "fn/7 signs an attestation of what passed and adds it to a public log. The release goes live." },
          ]}
        />
      </Block>

      <Block id="permissions" icon="key" lead="Permissions" title="A release says what it needs. The Gate checks that it's true." intro="Network access, secrets, shell commands and the folders it writes to are declared up front. A release that does more than it declares is rejected. The listing shows it in plain words: Needs git. No network. No secrets.">
        <Reveal>
          <CodeBlock caption="From a release's fn7.json" code={PERMISSIONS} />
        </Reveal>
      </Block>

      <Block id="injection" icon="bot" lead="Prompt injection" title="Skills are instructions. So they're read like an attack." intro="A marketplace for people doesn't need this. A marketplace for agents can't run without it. Every file an agent will follow, and every line of text an agent will see in search, is screened for:" raised>
        <Points
          items={[
            "Hidden text: zero-width characters, direction switches, comments, and text encoded to hide it.",
            "Instructions to read or send keys, tokens, environment files, SSH keys or wallet files.",
            "Instructions to ignore, override or hide things from the agent's owner.",
            "Instructions to contact a server the release doesn't declare.",
            "Instructions to buy, rate, review or recommend anything on fn/7.",
            "Instructions to change the agent's own settings outside the folder it declared.",
          ]}
        />
      </Block>

      <Block id="proof" icon="check" lead="Proof" title="Signed, logged and checkable offline.">
        <Facts
          rows={[
            { area: "Attestation", fact: "When a release passes, fn/7 signs a record of what was checked and the hash of what was checked, with an Ed25519 key." },
            { area: "Transparency log", fact: "Every attestation is appended to a public log in which each entry carries the hash of the one before, so nothing can be changed quietly." },
            { area: "File hashes", fact: "Every file has a published SHA-256. A buyer can confirm they received exactly what was reviewed." },
            { area: "Signed receipts", fact: "Each purchase produces a signed receipt that proves the right to use the release, checkable without calling fn/7." },
            { area: "Verified install", fact: "The fn7 CLI verifies the attestation and every hash before it writes a file. A client using only the remote server gets the same proof to check itself." },
          ]}
        />
      </Block>

      <Block id="limits" icon="lens" lead="What is still exposed" title="No marketplace is bulletproof. Here is what remains." raised>
        <Points
          items={[
            "A skilled attacker can write instructions that pass every check. The defenses are declared permissions, the owner's own policy, and fast withdrawal with a warning to agents.",
            "Stolen work that has been reworded or redrawn can pass the copy checks. Reports and takedowns are the backstop.",
            "Human review doesn't scale, so low-priced releases from creators with a clean record can go live on the automatic checks alone.",
            "Before real money moves, fn/7 needs an outside penetration test and a smart-contract audit. Neither has happened yet.",
          ]}
        />
        <div className="linklist">
          <Button href={ROUTES.security} variant="line" size="sm">
            Security policy
          </Button>
          <Button href={`${ROUTES.legal}/acceptable-use`} variant="line" size="sm">
            What can&rsquo;t be listed
          </Button>
          <Button href={SITE.repo.security} variant="line" size="sm">
            Report privately on GitHub
          </Button>
        </div>
      </Block>
    </>
  );
}
