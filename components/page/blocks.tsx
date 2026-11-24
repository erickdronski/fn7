import Link from "next/link";
import type { ReactNode } from "react";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { Reveal } from "@/components/ui/reveal";
import { isExternal } from "@/lib/site";

/** The top of an inner page: one statement in the display face, one paragraph, and the actions. */
export function PageHero({ title, lead, note, children }: { title: string; lead: string; note?: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1 className="display">{title}</h1>
        <p>{lead}</p>
        {children ? <div className="hero-cta">{children}</div> : null}
        {note ? <p className="page-note">{note}</p> : null}
      </div>
    </section>
  );
}

/** A section with the two-tone headline: an accent line that names the idea, then the claim. */
export function Block({
  id,
  lead,
  title,
  intro,
  raised = false,
  children,
}: {
  id?: string;
  lead?: string;
  title: string;
  intro?: string;
  raised?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className={`section${raised ? " gate" : ""}`} id={id}>
      <div className="wrap">
        <Reveal className="copy copy-wide">
          <h2>
            {lead ? <span className="lead">{lead}</span> : null}
            {title}
          </h2>
          {intro ? <p>{intro}</p> : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** A real sequence, numbered. Only for steps that happen in order. */
export function Steps({ items }: { items: Array<{ title: string; text: string }> }) {
  return (
    <ol className="steps">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 70}>
            <span className="steps-n mono">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Reasons({ items }: { items: Array<{ icon: PixelIconName; title: string; text: string }> }) {
  return (
    <ul className="reasons">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 70}>
            <PixelIcon name={item.icon} size={44} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function Facts({ rows }: { rows: ReadonlyArray<{ area: ReactNode; fact: ReactNode }> }) {
  return (
    <Reveal>
      <table className="spec">
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.area}</th>
              <td>{row.fact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}

export function Points({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ul className="points">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Reveal>
  );
}

export type TileLink = { icon: PixelIconName; title: string; text: string; href: string };

export function TileLinks({ items }: { items: TileLink[] }) {
  return (
    <ul className="ways">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 60}>
            {isExternal(item.href) ? (
              <a className="tile way" href={item.href} target="_blank" rel="noreferrer">
                <TileBody item={item} />
              </a>
            ) : (
              <Link className="tile way" href={item.href}>
                <TileBody item={item} />
              </Link>
            )}
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function TileBody({ item }: { item: TileLink }) {
  return (
    <>
      <PixelIcon name={item.icon} size={36} />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </>
  );
}

export function CodeBlock({ caption, code, action }: { caption: string; code: string; action?: ReactNode }) {
  return (
    <figure className="code">
      <figcaption>
        <span>{caption}</span>
        {action}
      </figcaption>
      <pre className="mono">{code}</pre>
    </figure>
  );
}
