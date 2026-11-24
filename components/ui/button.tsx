import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href?: string;
  variant?: "fill" | "line" | "ink" | "ghost";
  size?: "md" | "sm";
  className?: string;
  title?: string;
  children: ReactNode;
};

/** The one button. Renders a link when it goes somewhere, a button when it acts. */
export function Button({ href, variant = "fill", size = "md", className, title, children }: Props) {
  const classes = ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", className ?? ""].filter(Boolean).join(" ");
  if (!href) {
    return (
      <button type="button" className={classes} title={title}>
        {children}
      </button>
    );
  }
  if (/^https?:/.test(href)) {
    return (
      <a className={classes} href={href} title={title} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} title={title}>
      {children}
    </Link>
  );
}
