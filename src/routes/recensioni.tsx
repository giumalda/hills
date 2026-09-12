import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { reviews } from "@/data/menu";

export const Route = createFileRoute("/recensioni")({
  head: () => ({
    meta: [
      { title: "Recensioni dei clienti | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Le recensioni di chi ha già assaggiato i panini di Hill's Burger & Chips a Mottola (TA): combo, special burger e il mitico Big Simpson.",
      },
      { property: "og:title", content: "Recensioni dei clienti | Hill's Burger & Chips" },
      {
        property: "og:description",
        content: "Cosa dicono i clienti di Hill's Burger & Chips a Mottola (TA).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  useReveal();

  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Recensioni
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-ink/75 md:text-base">
            Chi passa da Hill&apos;s torna. Ecco cosa raccontano.
          </p>
          <div className="glass mx-auto mt-6 inline-flex items-center gap-3 rounded-full px-5 py-3">
            <span className="font-display text-2xl text-ink">{avg}</span>
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-semibold text-ink/70">{reviews.length} recensioni</span>
          </div>
        </header>

        <section aria-label="Recensioni dei clienti" className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="reveal glass-card relative rounded-3xl p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="absolute right-5 top-5 size-8 text-ink/10" />
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm font-medium leading-relaxed text-ink/80">“{r.text}”</p>
              <p className="mt-4 font-display text-base uppercase text-ink">{r.name}</p>
            </article>
          ))}
        </section>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/menu"
            className="rounded-full bg-ink px-7 py-4 font-display text-lg uppercase text-sun transition-transform hover:scale-105"
          >
            Vai al menu
          </Link>
          <Link
            to="/contatti"
            className="glass rounded-full px-7 py-4 font-display text-lg uppercase text-ink transition-transform hover:scale-105"
          >
            Contatti
          </Link>
        </div>
      </div>
    </main>
  );
}
