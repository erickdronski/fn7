import Link from "next/link";
import { Suspense, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { BUILD_MENU, NAV_LINKS, RESOURCES_MENU, SITE, isExternal } from "@/lib/site";
import { NavShell } from "./nav-shell";
import { StarButton, StarButtonFallback } from "./star-button";
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
        <Menu label="Resources" items={RESOURCES_MENU} />
        <Menu label="Build with us" items={BUILD_MENU} />
      </nav>
      <div className="nav-actions">
        <Button href={SITE.repo.feedback} variant="line" size="sm">
          Share feedback
        </Button>
        <Suspense fallback={<StarButtonFallback size="sm" />}>
          <StarButton size="sm" />
        </Suspense>
      </div>
    </>
  );

  const all = [...NAV_LINKS, ...RESOURCES_MENU, ...BUILD_MENU];
  const sheet = (
    <nav aria-label="Main, small screens" className="sheet-links">
      {all.map((link, index) => {
        const style = { "--i": index } as CSSProperties;
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
      <div className="sheet-actions">
        <Suspense fallback={<StarButtonFallback />}>
          <StarButton />
        </Suspense>
      </div>
    </nav>
  );

  return <NavShell bar={bar} sheet={sheet} />;
}
