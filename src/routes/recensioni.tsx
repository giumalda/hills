import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const fullReviews = [
  {
    name: "Carmine P.",
    badge: "Local Guide · 12 recensioni · 12 foto",
    time: "a month ago",
    stars: 5,
    text: "Ottima paninoteca! Hamburger davvero gustosi, preparati con ingredienti freschi e di qualità. Il pane era morbido, la carne cotta alla perfezione e le patatine croccanti e saporite. Anche il personale è stato gentile, disponibile e veloce nel servizio. Locale pulito e accogliente, perfetto per una cena tra amici o in famiglia. Sicuramente ci tornerò e lo consiglio a chi cerca un ottimo hamburger!",
    details: "Food: 5/5  |  Service: 5/5  |  Atmosphere: 5/5",
  },
  {
    name: "Tokio18",
    badge: "Local Guide · 77 recensioni · 74 foto",
    time: "Edited 3 months ago",
    stars: 5,
    priceRange: "€10–20",
    text: `Un ambiente molto tranquillo,alla mano,molto ospitali,accogliente,staff abbastanza organizzato
Cibo molto buono e di ottima qualità
Staff simpatico e veloce
Non abbiamo atteso tanto ed era un venerdì`,
    details: `Food: 5/5  |  Service: 4/5  |  Atmosphere: 5/5

Noise level
Quiet, easy to talk

Group size
Suitable for all group sizes

Wait time
10-30 min`,
  },
  {
    name: "Lucia L.",
    badge: "5 recensioni",
    time: "5 months ago",
    stars: 5,
    priceRange: "€10–20",
    text: "Panini magnifici, grande opportunità di scelta in base ai propri gusti, ricchi e con prodotti di prima scelta. Persone gentilissime e professionali. Siamo stati benissimo",
    details: `Food: 5/5  |  Service: 5/5  |  Atmosphere: 4/5

Noise level
Moderate noise

Group size
Suitable for all group sizes

Wait time
Up to 10 min

Vegetarian options
Indubbiamente accessibili per vegetariani, oltre alla presenza di panini specifici puoi scegliere cosa inserire nel panino`,
  },
  {
    name: "Francesco P.",
    badge: "Local Guide · 16 recensioni · 7 foto",
    time: "a year ago",
    stars: 5,
    priceRange: "€10–20",
    text: "Panini buonissimi e con una ampia scelta servizio ottimo, complimenti ai proprietari Antonio e Pina, tutto buonissimo",
    details: `Food: 5/5  |  Service: 5/5  |  Atmosphere: 4/5

Noise level
Quiet, easy to talk

Group size
5-8 people

Wait time
No wait

Parking space
Plenty of parking

Parking options
Free parking lot e Free street parking

Kid-friendliness
Si

Wheelchair accessibility
No`,
  },
];

export const Route = createFileRoute("/recensioni")({
  head: () => ({
    meta: [
      { title: "Recensioni dei clienti | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Le recensioni complete di chi ha già assaggiato i panini di Hill's Burger & Chips a Mottola (TA).",
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

      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Recensioni Complete
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-ink/75 md:text-base">
            Chi passa da Hill&apos;s torna. Trasparenza totale dalla community Google.
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
              Vedi tutte su Google
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

        <section aria-label="Recensioni dei clienti" className="mt-12 space-y-6">
          {fullReviews.map((r, i) => (
            <article
              key={`${r.name}-${i}`}
              className="reveal glass-card rounded-3xl p-6 md:p-8 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/10 pb-4">
                <div>
                  <h3 className="font-display text-xl uppercase text-ink">{r.name}</h3>
                  <p className="text-xs font-semibold text-ink/60">{r.badge}</p>
                </div>
                <div className="text-right text-xs font-semibold text-ink/70">
                  <span>{r.time}</span>
                  {r.priceRange ? <span> · {r.priceRange}</span> : null}
                </div>
              </div>

              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: r.stars }).map((_, s) => (
                  <Star key={s} className="size-4 fill-current" />
                ))}
              </div>

              <p className="text-sm font-medium leading-relaxed text-ink/85 whitespace-pre-line">
                {r.text}
              </p>

              {r.details ? (
                <div className="rounded-2xl bg-ink/5 p-4 text-xs font-medium text-ink/75 whitespace-pre-line">
                  {r.details}
                </div>
              ) : null}
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
