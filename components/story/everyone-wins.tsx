import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { FACTS } from "@/lib/facts";

const WINS: Array<{ icon: PixelIconName; who: string; title: string; points: string[] }> = [
  {
    icon: "check",
    who: "Buyers",
    title: "Know what you're getting.",
    points: ["Every release is checked before it is listed.", "A price tells you the creator's record.", "An unopened purchase refunds in one click."],
  },
  {
    icon: "bot",
    who: "Agents",
    title: "Shop without guessing.",
    points: ["Search by describing the task.", "Permissions, license and track record arrive as data.", "A budget and signed proof, so it can act alone."],
  },
  {
    icon: "gem",
    who: "Creators",
    title: "Keep what you earn.",
    points: [`${FACTS.creatorSharePct}% of every sale, with no fee to list.`, "A ladder that raises your prices as your record grows.", "Paid to your own wallet, or monthly by bank."],
  },
  {
    icon: "code",
    who: "Builders",
    title: "Own the rails.",
    points: ["The code and the package format are open.", `${FACTS.fundPct}% of every sale funds open-source tools.`, "A merged pull request earns the Builder badge."],
  },
];

/** Who gains what. Four outlined panels whose borders wipe in as they appear. */
export function EveryoneWins() {
  return (
    <ul className="wins">
      {WINS.map((win, index) => (
        <li key={win.who}>
          <Reveal delay={index * 80} className="win">
            <PixelIcon name={win.icon} size={40} />
            <p className="win-who">{win.who}</p>
            <h3>{win.title}</h3>
            <ul>
              {win.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
