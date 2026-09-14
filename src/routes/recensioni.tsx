import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Quote, ExternalLink } from "lucide-react";
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
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  useReveal();

  const googleRating = "4.2";
  const googleTotalReviews = "2200+";

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28"
      style={{
        backgroundImage: `radial-gradient(rgba(30, 20, 10, 0.08) 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
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
          <div className="glass mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-full px-5 py-3">
            <span className="font-display text-2xl text-ink">{googleRating}</span>
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-semibold text-ink/70">{googleTotalReviews} su Google</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.google.com/search?q=Hill's+Burger+&+CHIPS+by+Antonio+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-display text-sm uppercase text-ink transition-transform hover:scale-105"
            >
              Vedi tutte
              <ExternalLink className="size-4" />
            </a>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJv6rnyNwJRxMRQufeWMAu7cI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Recensisci su Google
              <ExternalLink className="size-4" />
            </a>
          </div>
        </header>

        <section aria-label="Recensioni dei clienti" className="mt-12">
          <div className="grid gap-5 md:grid-cols-2">
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
          </div>
          <p className="mt-8 text-center text-xs font-medium text-ink/50">
            Recensioni verificate da piattaforme esterne. Dati gestiti a norma GDPR.
          </p>
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
