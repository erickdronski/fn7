import Link from "next/link";

export default function Missing() {
  return (
    <main className="missing">
      <h1 className="pixel">That stall moved</h1>
      <p>The street is still up.</p>
      <Link href="/">Back to the street</Link>
    </main>
  );
}
