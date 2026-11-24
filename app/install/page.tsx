import type { Metadata } from "next";
import { InstallTabs } from "@/components/install/install-tabs";
import { SourceLink, ToolMark, ToolPanel } from "@/components/install/tool-panel";
import { Block, Facts, Lead, Reasons } from "@/components/page/blocks";
import { Button } from "@/components/ui/button";
import { DIRECTORY_RULES, INSTALL_TOOLS, MCP_URL, PLUGIN_PARTS, SERVER_MILESTONE, SERVER_STATE, SKILL_RULES, VERIFIED_ON } from "@/lib/install";
import { SHOW_MARKS_ON_HOLD } from "@/lib/marks";
import { ROUTES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Add fn/7 to your tools",
  description: `How to add fn/7's MCP server to Claude, Codex, ChatGPT, Cursor, VS Code and other AI tools, with the exact setting for each. The server ships in milestone ${SERVER_MILESTONE} and is not live yet.`,
  alternates: { canonical: ROUTES.install },
};

export default function InstallPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <h1 className="display">Add fn/7 to your tools</h1>
          <p>One address reaches the whole market. Pick your tool for the steps and the exact setting to paste, each checked against that tool&rsquo;s own guide.</p>
          <p className="install-notice" role="note">
            <strong>Not live yet.</strong> The fn/7 MCP server ships in milestone {SERVER_MILESTONE}, which is {SERVER_STATE.toLowerCase()} on the roadmap. These settings connect once it is live. Until then a tool that tries{" "}
            <code className="mono">{MCP_URL}</code> will report that it could not connect.
          </p>
          <div className="hero-cta">
            <Button href={ROUTES.roadmap} variant="line">
              See the roadmap
            </Button>
            <Button href={ROUTES.agents} variant="ghost">
              How an agent shops
            </Button>
          </div>
        </div>
      </section>

      <section className="section install-section" id="tools">
        <div className="wrap">
          <div className="copy copy-wide">
            <h2>
              <Lead icon="wrench">Pick your tool</Lead>
              The same address, in each tool&rsquo;s own format.
            </h2>
            <p>Every step and snippet below was read from the tool&rsquo;s own documentation on {VERIFIED_ON}. Nothing here holds a key. fn/7 signs an agent in through your browser.</p>
          </div>
          <InstallTabs label="AI tools" tabs={INSTALL_TOOLS.map((tool) => ({ id: tool.id, label: tool.name, icon: <ToolMark tool={tool} size={16} /> }))} panels={INSTALL_TOOLS.map((tool) => <ToolPanel key={tool.id} tool={tool} />)} />
        </div>
      </section>

      <Block
        id="plugin"
        icon="bot"
        lead="The plugin"
        title="What it gives an agent."
        intro="A connection alone leaves an agent to guess how a market works. The Claude Code plugin in this repository pairs the connection with the rules for using it well. Anthropic’s plugin docs say its parts load in Claude Code, in Cowork and in a chat on claude.ai."
        raised
      >
        <Reasons items={PLUGIN_PARTS} />
        <Facts rows={SKILL_RULES} />
        <p className="fineprint">
          The plugin is the folder <code className="mono">plugins/fn7</code> in the repository, and <code className="mono">.claude-plugin/marketplace.json</code> lists it. It passes <code className="mono">claude plugin validate</code>. Like every setting on this page, it has nothing to
          reach until {SERVER_MILESTONE} ships.
        </p>
        <div className="linklist">
          <Button href={SITE.repo.url} variant="line" size="sm">
            Open the repository on GitHub
          </Button>
          <Button href={ROUTES.trust} variant="line" size="sm">
            How releases are checked
          </Button>
        </div>
      </Block>

      <Block
        id="directories"
        icon="shield"
        lead="Directories"
        title="Where fn/7 can’t be fully listed, and the plan there."
        intro="Adding fn/7 by its address needs no one’s permission. Appearing in a tool’s own directory is a separate step with its own rules, and two directories have a rule a market can’t fully meet."
      >
        <Facts
          rows={DIRECTORY_RULES.map((entry) => ({
            area: entry.name,
            fact: (
              <>
                {entry.rule} <strong className="install-plan">The plan:</strong> {entry.plan} Source: <SourceLink source={entry.source} />.
              </>
            ),
          }))}
        />
        <p className="fineprint">Both listings come after {SERVER_MILESTONE}, once the server is stable. Neither exists today.</p>
        <p className="fineprint">
          Each name and mark on this page belongs to its owner. fn/7 uses them only to say which tool a setting is for{SHOW_MARKS_ON_HOLD ? "" : ", and shows a mark only where its owner’s published rule allows it"}. None of these companies endorses fn/7, and none is a partner.
        </p>
      </Block>
    </>
  );
}
