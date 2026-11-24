import { Button } from "@/components/ui/button";
import { egg } from "@/lib/eggs";

export default function NotFound() {
  return (
    <section className="missing">
      <div className="wrap">
        <h1 className="display">{egg("notFound", "Page not found")}</h1>
        <p>That page doesn&rsquo;t exist. The market is still being built, so it may not exist yet.</p>
        <Button href="/">Back to the start</Button>
      </div>
    </section>
  );
}
