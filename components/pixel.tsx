const ink: Record<string, string> = {
  y: "#f0a202",
  p: "#f3e6c8",
  c: "#7ee0d6",
  m: "#6ea84a",
  r: "#e23d28",
};

export function Keeper({ rows, label }: { rows: string[]; label: string }) {
  return (
    <span className="keeper" role="img" aria-label={label}>
      {rows.map((row, y) => (
        <span className="keeper-row" key={y}>
          {[...row].map((cell, x) => (
            <span
              key={x}
              className="keeper-cell"
              style={{ background: ink[cell] ?? "transparent" }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}
