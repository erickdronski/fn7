import { Button } from "@/components/ui/button";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { getRepoStats } from "@/lib/github";
import { SITE } from "@/lib/site";

const format = new Intl.NumberFormat("en-US");

type Props = { variant?: "fill" | "line" | "ink"; size?: "md" | "sm" };

/** "Star on GitHub", with the live count once there is one. No number when GitHub doesn't answer, or at zero. */
export async function StarButton({ variant = "fill", size = "md" }: Props) {
  const { stars } = await getRepoStats();
  return (
    <Button href={SITE.repo.url} variant={variant} size={size}>
      <PixelIcon name="star" size={14} />
      Star on GitHub
      {stars ? <span className="count">{format.format(stars)}</span> : null}
    </Button>
  );
}

/** Shown while the count loads, so the button never shifts. */
export function StarButtonFallback({ variant = "fill", size = "md" }: Props) {
  return (
    <Button href={SITE.repo.url} variant={variant} size={size}>
      <PixelIcon name="star" size={14} />
      Star on GitHub
    </Button>
  );
}
