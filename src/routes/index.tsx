import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, MapPin, Sparkles, Star, Utensils } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import heroBurger from "@/assets/hero-burger.png";
import fries from "@/assets/fries.png";
import cola from "@/assets/cola.png";
import gourmet from "@/assets/gourmet-burger.jpg";
import porchetta from "@/assets/porchetta-panino.jpg";
import { reviews } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hill's Burger & Chips | Mottola (TA)" },
      {
        name: "description",
        content:
          "Hill's Burger & Chips a Mottola (TA): panini, combo, special burger in stile Springfield. Griglia, qualità e sapore senza compromessi.",
      },
      { property: "og:title", content: "Hill's Burger & Chips | Mottola (TA)" },
      {
        property: "og:description",
        content: "Il regno del panino a Mottola (TA). Scopri il menu, le combo e vieni a trovarci.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      {/* Hero Section */}
      <section className="relative px-4 pt-32 md:px-6 md:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sun">
              <Flame className="size-3.5 text-primary" />
              <span>A Mottola dal gusto esplosivo</span>
            </div>
            <h1 className="mt-5 font-display text-5xl uppercase leading-[0.95] tracking-tight text-paper text-stroke-ink sm:text-6xl md:text-7xl">
              Hill&apos;s <span className="text-ink">Burger</span> &amp; Chips
            </h1>
            <p className="mt-5 max-w-lg text-base font-semibold leading-relaxed text-ink/75 sm:text-lg">
              Panini giganti, bombette, porchetta croccante e fritti fatti come comanda la tradizione. Scegli, ordina e godi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 font-display text-lg uppercase tracking-wide text-sun shadow-lg transition-transform hover:scale-105"
              >
                <span>Esplora il Menu</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contatti"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-display text-lg uppercase tracking-wide text-ink transition-transform hover:scale-105"
              >
                <MapPin className="size-5 text-primary" />
                <span>Dove Siamo</span>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm font-semibold text-ink/65">
              <div className="flex items-center gap-2">
                <Utensils className="size-4 text-primary" />
                <span>Asporto &amp; Tavolo</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-4 fill-primary text-primary" />
                <span>4.2/5 su Google</span>
              </div>
            </div>
          </div>

          {/* Hero Visual con Burger, Patatine e Bibita */}
          <div className="reveal relative flex items-center justify-center md:col-span-5">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative z-10 flex flex-col items-center">
                <img
                  src={heroBurger}
                  alt="Big Simpson Burger"
                  className="w-full max-w-[280px] drop-shadow-2xl sm:max-w-[340px]"
                />
              </div>

              {/* Contenitore laterale patatine e bibita rimodulato mobile / pc */}
              <div className="z-20 mt-4 flex items-center justify-center gap-6 sm:mt-6 sm:gap-8 md:absolute md:-bottom-6 md:-left-10 md:mt-0 md:flex-col md:items-start md:gap-4">
                <div className="glass-chip flex items-center gap-2.5 rounded-2xl p-2.5 sm:rounded-3xl sm:p-3 md:scale-110">
                  <img
                    src={fries}
                    alt="Patatine"
                    className="size-16 object-contain sm:size-20 md:size-24"
                  />
                  <div className="pr-2">
                    <span className="block font-display text-sm uppercase text-ink sm:text-base">
                      Chips Croccanti
                    </span>
                    <span className="text-xs font-semibold text-ink/60">Sempre calde</span>
                  </div>
                </div>
                <div className="glass-chip flex items-center gap-2.5 rounded-2xl p-2.5 sm:rounded-3xl sm:p-3 md:ml-12 md:scale-110">
                  <img
                    src={cola}
                    alt="Bibita"
                    className="size-14 object-contain sm:size-16 md:size-20"
                  />
                  <div className="pr-2">
                    <span className="block font-display text-sm uppercase text-ink sm:text-base">
                      Bibita Ghiacciata
                    </span>
                    <span className="text-xs font-semibold text-ink/60">Formato 33cl / 1L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vetrina Panini */}
      <section aria-label="I nostri panini" className="mx-auto mt-28 max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span className="font-display text-sm uppercase tracking-widest text-primary">
            I Must Have
          </span>
          <h2 className="mt-1 font-display text-3xl uppercase text-ink sm:text-4xl">
            I Nostri Panini
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            {
              img: gourmet,
              title: "Smash Burger",
              body: "Double smash burger di scottona, doppia fetta di cheddar sciolto, salsa burger segreta e bacon croccante.",
            },
            {
              img: porchetta,
              title: "Menu Porketta",
              body: "Porchetta croccante, provola, patatine dentro al panino, birra e fritti: tutto a 10€.",
            },
          ].map((c, i) => (
            <article
              key={c.title}
              className="reveal glass-card group overflow-hidden rounded-3xl p-6 transition-transform hover:scale-[1.02]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-paper/50">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl uppercase text-ink">{c.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink/75">{c.body}</p>
              <div className="mt-5">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-1.5 font-display text-sm uppercase text-primary hover:underline"
                >
                  <span>Scopri nel menu</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Springfield Vibe Banner */}
      <section className="mx-auto mt-28 max-w-6xl px-4 md:px-6">
        <div className="reveal glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              <Sparkles className="size-3.5 text-primary" />
              <span> Springfield Style</span>
            </span>
            <h2 className="mt-4 font-display text-3xl uppercase text-ink sm:text-4xl">
              Non solo un fast food, un&apos;esperienza
            </h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-ink/75 sm:text-base">
              Atmosfera colorata, porzioni generose e il gusto inconfondibile di chi mette la griglia al primo posto. Perfetto per serate con amici o una fame da Bart Simpson.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/recensioni"
                className="rounded-full bg-ink px-6 py-3 font-display text-sm uppercase text-sun transition-transform hover:scale-105"
              >
                Leggi le recensioni
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recensioni in evidenza */}
      <section aria-label="Recensioni in evidenza" className="mx-auto mt-28 max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span className="font-display text-sm uppercase tracking-widest text-primary">
            Dicono di noi
          </span>
          <h2 className="mt-1 font-display text-3xl uppercase text-ink sm:text-4xl">
            La voce del popolo
          </h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <article
              key={r.name}
              className="reveal glass-card flex flex-col justify-between rounded-3xl p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div>
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-ink/85">“{r.text}”</p>
              </div>
              <p className="mt-6 font-display text-base uppercase text-ink">{r.name}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/recensioni"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-base uppercase text-ink transition-transform hover:scale-105"
          >
            <span>Tutte le recensioni</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
