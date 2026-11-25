import { BrandIcon } from "@/components/ui/brand-icon";
import { SITE } from "@/lib/site";

const channels = [
  { name: "GitHub", brand: "github", href: SITE.repo.url },
  { name: "X", brand: "x", href: "https://x.com/fn7marketplace" },
  { name: "Discord", brand: "discord", href: "https://discord.gg/ea8evyV6G" },
] as const;

export function SocialLinks({ showNames = false }: { showNames?: boolean }) {
  return (
    <ul className="site-socials" aria-label="fn/7 community channels">
      {channels.map(({ name, brand, href }) => (
        <li key={brand}>
          <a href={href} target="_blank" rel="noreferrer" title={name}>
            <span aria-hidden="true"><BrandIcon name={brand} size={18} /></span>
            <span className={showNames ? undefined : "sr-only"}>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
