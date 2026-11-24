import type { Metadata } from "next";
import { PageHero } from "@/components/page/blocks";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CHANGELOG } from "@/lib/content";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What has shipped in fn/7, newest first.",
  alternates: { canonical: ROUTES.changelog },
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero title="Changelog" lead="What has shipped, newest first. Every commit is public in the repository.">
        <Button href={`${SITE.repo.url}/commits`}>See every commit</Button>
        <Button href={ROUTES.roadmap} variant="line">
          See what&rsquo;s next
        </Button>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <ol className="log">
            {CHANGELOG.map((entry) => (
              <li key={entry.title}>
                <Reveal>
                  <p className="log-date mono">{entry.date}</p>
                  <h2>{entry.title}</h2>
                  <ul className="points">
                    {entry.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
