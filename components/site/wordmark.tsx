/** The fn/7 wordmark. Its slash is five pixel steps: the one pixel in the logo. */
export function Wordmark({ slash = "var(--cyan)", className }: { slash?: string; className?: string }) {
  return (
    <span className={`wordmark ${className ?? ""}`} role="img" aria-label="fn/7">
      <span aria-hidden="true">fn</span>
      <svg viewBox="0 0 10 16" className="px" aria-hidden="true" focusable="false">
        {[0, 1, 2, 3, 4].map((step) => (
          <rect key={step} x={step * 2} y={13 - step * 3} width="2" height="3" fill={slash} />
        ))}
      </svg>
      <span aria-hidden="true">7</span>
    </span>
  );
}
