import Link from "next/link";
import { type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { BUILD_MENU, HOW_MENU, NAV_GROUPS, NAV_LINKS, RESOURCES_MENU, SITE, isExternal } from "@/lib/site";
import { NavShell } from "./nav-shell";
import { SocialLinks } from "./social-links";
import { Wordmark } from "./wordmark";

export function Nav() {
  const bar = (
    <>
      <Link href="/" className="nav-mark" aria-label="fn/7, home">
        <Wordmark />
      </Link>
      <nav className="nav-links" aria-label="Main">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="link nav-link">
            {link.label}
          </Link>
        ))}
        <Menu label="How it works" items={HOW_MENU} />
        <Menu label="Resources" items={RESOURCES_MENU} />
        <Menu label="Build with us" items={BUILD_MENU} />
      </nav>
      <div className="nav-actions">
        <Button href={SITE.repo.feedback} variant="line" size="sm">
          Share feedback
        </Button>
        <SocialLinks />
      </div>
    </>
  );

  // Each link's place in the whole sheet, for the entrance stagger.
  const starts = NAV_GROUPS.map((_, index) => NAV_GROUPS.slice(0, index).reduce((sum, group) => sum + group.links.length, 0));
  const sheet = (
    <nav aria-label="Main, small screens" className="sheet-links">
      <div className="sheet-actions"><SocialLinks showNames /></div>
      {NAV_GROUPS.map((group, groupIndex) => (
        <section key={group.title} className="sheet-group" aria-label={group.title}>
          <h2 className="sheet-title">{group.title}</h2>
          {group.links.map((link, index) => {
            const style = { "--i": starts[groupIndex] + index } as CSSProperties;
            return isExternal(link.href) ? (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" style={style}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} style={style}>
                {link.label}
              </Link>
            );
          })}
        </section>
      ))}
    </nav>
  );

  return <NavShell bar={bar} sheet={sheet} />;
}
