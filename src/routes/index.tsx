import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Star, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import heroBurger from "@/assets/hero-burger.png";
import gourmet from "@/assets/gourmet-burger.jpg";
import porchetta from "@/assets/porchetta-panino.jpg";
import { reviews } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hill's Burger & Chips | Qui comanda il Panino!" },
      {
        name: "description",
        content:
          "Paninoteca Hill's Burger & Chips a Mottola (TA): burger di scottona, porchetta, combo a 10€ e panini in carta. Qui comanda il Panino!",
      },
      { property: "og:title", content: "Hill's Burger & Chips | Qui comanda il Panino!" },
      {
        property: "og:description",
        content: "Griglia accesa a Mottola (TA), porzioni giganti e menu completi a 10€.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const isHiring = true;

function Home() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      {/* Background blobs & pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(30, 20, 10, 0.08) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper/60 px-4 py-1.5 backdrop-blur-md mb-6 shadow-sm">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="font-display text-xs uppercase tracking-wider text-ink/80">
              Hill&apos;s Burger & Chips
            </span>
          </div>

          <h1 className="font-display text-5xl uppercase tracking-tight text-paper text-stroke-ink md:text-7xl lg:text-8xl max-w-4xl mx-auto leading-none">
            Qui comanda il Panino!
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-lg font-medium text-ink/75 leading-relaxed">
            Griglia accesa a Mottola (TA), porzioni giganti, menu completi a 10€ e ricette che lasciano il segno.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-sm uppercase tracking-wider text-sun shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Esplora il Menu
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/info"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper/80 px-8 py-4 font-display text-sm uppercase tracking-wider text-ink backdrop-blur-md transition-all hover:bg-paper active:scale-95"
            >
              Info & Orari
            </Link>
          </div>
        </section>

        {/* Hiring Banner se attivo */}
        {isHiring ? (
          <section className="my-8">
            <div className="glass-card reveal rounded-3xl border border-primary/40 bg-primary/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                  <BriefcaseBusiness className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase text-ink">Cerchiamo Personale!</h3>
                  <p className="text-sm font-medium text-ink/75">
                    Unisciti alla nostra squadra alla griglia o al banco. Contattaci per i dettagli.
                  </p>
                </div>
              </div>
              <Link
                to="/info"
                className="shrink-0 rounded-full bg-ink px-6 py-2.5 font-display text-xs uppercase text-sun transition-transform hover:scale-105 active:scale-95"
              >
                Candidati ora
              </Link>
            </div>
          </section>
        ) : null}

        {/* Quick Info Grid */}
        <section className="grid gap-5 sm:grid-cols-3 my-12">
          <div className="glass-card reveal rounded-3xl p-6 flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-ink/5 flex items-center justify-center text-ink shrink-0">
              <Clock className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-base uppercase text-ink">Orari Sera</h3>
              <p className="mt-1 text-sm text-ink/75 font-medium">
                Aperti tutti i giorni dalle 19:00 alle 00:00
              </p>
            </div>
          </div>

          <div className="glass-card reveal rounded-3xl p-6 flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-ink/5 flex items-center justify-center text-ink shrink-0">
              <MapPin className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-base uppercase text-ink">Dove Siamo</h3>
              <p className="mt-1 text-sm text-ink/75 font-medium">
                Mottola (TA) · Via e zone centrali
              </p>
            </div>
          </div>

          <div className="glass-card reveal rounded-3xl p-6 flex items-start gap-4">
            <div className="size-12 rounded-2xl bg-ink/5 flex items-center justify-center text-ink shrink-0">
              <Phone className="size-6" />
            </div>
            <div>
              <h3 className="font-display text-base uppercase text-ink">Asporto & Ordini</h3>
              <p className="mt-1 text-sm text-ink/75 font-medium">
                Contattaci per prenotare il tuo tavolo o l'asporto
              </p>
            </div>
          </div>
        </section>

        {/* Gallery / Showcase Visuals */}
        <section className="grid gap-6 md:grid-cols-3 my-16">
          <div className="glass-card reveal overflow-hidden rounded-3xl flex flex-col">
            <div className="aspect-video overflow-hidden bg-ink/5">
              <img src={heroBurger} alt="Burger Hill's" className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl uppercase text-ink">Scottona & Griglia</h3>
              <p className="mt-2 text-sm text-ink/75 font-medium">
                La carne scelta al Millimetro per panini succosi e cotti a regola d'arte.
              </p>
            </div>
          </div>

          <div className="glass-card reveal overflow-hidden rounded-3xl flex flex-col">
            <div className="aspect-video overflow-hidden bg-ink/5">
              <img src={gourmet} alt="Gourmet Burger" className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl uppercase text-ink">Special Edition</h3>
              <p className="mt-2 text-sm text-ink/75 font-medium">
                Accostamenti coraggiosi, cheddar fuso e salse artigianali in carta speciale.
              </p>
            </div>
          </div>

          <div className="glass-card reveal overflow-hidden rounded-3xl flex flex-col">
            <div className="aspect-video overflow-hidden bg-ink/5">
              <img src={porchetta} alt="Porchetta Panino" className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl uppercase text-ink">Tradizione & Porchetta</h3>
              <p className="mt-2 text-sm text-ink/75 font-medium">
                Il sapore autentico della porchetta croccante abbracciata dal pane caldo.
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews && reviews.length > 0 ? (
          <section className="my-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl uppercase text-ink md:text-4xl">
                  Dicono di noi
                </h2>
                <p className="mt-1 text-sm font-medium text-ink/65">
                  La parola a chi ha testato la griglia
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 3).map((r, i) => (
                <div
                  key={i}
                  className="reveal glass-card rounded-3xl p-6 flex flex-col justify-between"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div>
                    <div className="flex items-center gap-1 text-primary mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="size-4 fill-primary" />
                      ))}
                    </div>
                    <p className="text-sm font-medium italic text-ink/80 leading-relaxed">
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ink/10">
                    <span className="font-display text-sm uppercase text-ink font-bold">
                      {r.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
