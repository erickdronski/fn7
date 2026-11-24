import type { Metadata } from "next";
import { Suspense, type CSSProperties } from "react";
import { Block, Facts, PageHero, Points } from "@/components/page/blocks";
import { StarButton, StarButtonFallback } from "@/components/site/star-button";
import { EveryoneWins } from "@/components/story/everyone-wins";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { FACTS } from "@/lib/facts";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why fn/7",
  description: "What the name means, why fn/7 exists, what it is being built to do, and who gains from it.",
  alternates: { canonical: ROUTES.about },
};

const ARGS: Array<{ name: string; text: string }> = [
  { name: "buyer", text: "Who is asking: a person, or an agent acting for one, under an alias." },
  { name: "creator", text: "Who made it, with the rank they have earned." },
  { name: "release", text: "Exactly which version, named by the hash of its files." },
  { name: "price", text: "One of twelve fixed tiers. Never a number someone typed." },
  { name: "permissions", text: "What the release is allowed to touch: network, secrets, shell, folders." },
  { name: "proof", text: "The Gate's signed attestation that this release passed its checks." },
  { name: "budget", text: "The cap the owner set, and the amount above which they are asked first." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A function that takes seven arguments"
        lead="In Erlang, Elixir and Prolog, a function is written as its name, a slash, and the number of arguments it takes. fn/7 is the function that takes seven. Every purchase here is one call to it. Say it “function seven”."
      >
        <Button href="#name">Read the signature</Button>
        <Button href="#why" variant="line">
          Why it exists
        </Button>
      </PageHero>

      <Block id="name" icon="code" lead="The name" title="Seven things a trade needs before it is safe to make." intro="When a person buys something, most of these are checked by instinct. An agent has no instinct. So fn/7 makes each one an explicit argument, and refuses the call if any is missing.">
        <Reveal>
          <p className="signature">
            <span className="sig-part">fn(</span>
            {ARGS.map((arg, index) => (
              <span key={arg.name} className="sig-part sig-arg">
                <span className="arg" style={{ "--n": index } as CSSProperties}>
                  {arg.name}
                </span>
                {index < ARGS.length - 1 ? ", " : ""}
              </span>
            ))}
            <span className="sig-part">
              ) →{" "}
              <span className="ret" style={{ "--n": ARGS.length } as CSSProperties}>
                receipt
              </span>
            </span>
          </p>
        </Reveal>
        <ol className="args">
          {ARGS.map((arg, index) => (
            <li key={arg.name}>
              <Reveal delay={(index % 3) * 60}>
                <h3>
                  <code>{arg.name}</code>
                </h3>
                <p>{arg.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
        <p className="fineprint">It returns one thing: a signed receipt that proves the right to use what was bought.</p>
      </Block>

      <Block id="readings" icon="book" lead="Also true" title="Five more ways to read it." raised>
        <Facts
          rows={[
            { area: "The keyword", fact: "In Rust and Zig, fn is the word that starts every function. It is the shortest way to say: here is something you can call." },
            { area: "Layer 7", fact: "The seventh layer of the network model is the application layer: the one where programs talk to each other. It is where agents live, and where fn/7 does its work." },
            { area: "The Fn key", fact: "The key that gives every other key a second function. An agent does that for a person, and fn/7 is where it finds the functions." },
            { area: "The slash", fact: "A slash can't live in a web address, so the sign has it and the address doesn't. In the wordmark it is five pixel steps, the one pixel in the logo." },
            { area: "The year 2100", fact: "Nobody visits a store. Something calls a function, and a receipt comes back." },
          ]}
        />
      </Block>

      <Block id="why" icon="lens" lead="Why it exists" title="Agents are starting to do real work. Real work needs tools.">
        <Reveal>
          <div className="purpose">
            <p>Today an agent that needs a skill, a dataset, a template or a lesson searches the open web and hopes. It can&rsquo;t tell what is safe, it can&rsquo;t pay, and the person who made the thing sees nothing.</p>
            <p>fn/7 gives agents a market they can search, trust and pay in. It gives the people who make those goods {FACTS.creatorSharePct}% of every sale. And it keeps the whole thing open, so nobody has to take that on faith.</p>
          </div>
        </Reveal>
      </Block>

      <Block id="goals" icon="flag" lead="What it is built to do" title="Four goals the build is measured against." raised>
        <Points
          items={[
            "An agent goes from connected to bought and installed in one chain of calls, inside its budget, with no human click.",
            "A person goes from the front page to a first purchase in under two minutes.",
            "A creator goes from signing up to a release submitted to the Gate in under ten minutes.",
            `A creator receives ${FACTS.creatorSharePct}% of the price paid, on every sale, at every price tier.`,
          ]}
        />
      </Block>

      <Block id="wins" icon="check" lead="Who gains" title="It only works if everyone wins.">
        <EveryoneWins />
      </Block>

      <Block id="rules" icon="shield" lead="What fn/7 won't do" title="Five lines it doesn't cross." raised>
        <Points
          items={[
            "Ranking can't be bought. There are no ads and no paid placement.",
            "There is no token, and nothing here is an investment.",
            "fn/7 never holds a buyer's or a creator's coins.",
            "Nothing is claimed before it is true. This site says what is built and what is planned.",
            `The creator's ${FACTS.creatorSharePct}% is not up for a vote.`,
          ]}
        />
        <div className="linklist">
          <Suspense fallback={<StarButtonFallback size="sm" />}>
            <StarButton size="sm" />
          </Suspense>
          <Button href={ROUTES.roadmap} variant="line" size="sm">
            See the roadmap
          </Button>
          <Button href={ROUTES.support} variant="line" size="sm">
            Back the project
          </Button>
        </div>
      </Block>
    </>
  );
}
