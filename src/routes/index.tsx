import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Star, BriefcaseBusiness, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import heroBurger from "@/assets/hero-burger.png";
import gourmet from "@/assets/smash-burger.jpg";
import porchetta from "@/assets/porchetta-panino.jpg";

const homeReviews = [
  {
    name: "Carmine P.",
    stars: 5,
    text: "Ottima paninoteca! Hamburger davvero gustosi, preparati con ingredienti freschi e di qualità. Il pane era morbido, la carne cotta alla perfezione e le patatine …",
  },
  {
    name: "Tokio18",
    stars: 5,
    text: "Un ambiente molto tranquillo,alla mano,molto ospitali,accogliente,staff abbastanza organizzato …",
  },
  {
    name: "Lucia L.",
    stars: 5,
    text: "Panini magnifici, grande opportunità di scelta in base ai propri gusti, ricchi e con prodotti di prima scelta. Persone gentilissime e professionali. Siamo …",
  },
  {
    name: "Francesco P.",
    stars: 5,
    text: "Panini buonissimi e con una ampia scelta servizio ottimo, complimenti ai proprietari Antonio e Pina, tutto buonissimo",
  },
];

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
    <main
      className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28"
      style={{
        backgroundImage: `radial-gradient(rgba(30, 20, 10, 0.08) 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      {/* HERO */}
      <section className="relative z-10 mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-4 text-center">
        <span className="glass animate-spring rounded-full px-5 py-2 font-display text-sm uppercase tracking-wide text-ink md:text-base">
          Hill&apos;s Burger & Chips
        </span>

        <h1 className="animate-spring mt-6 font-display text-4xl uppercase leading-[0.92] text-paper text-stroke-ink sm:text-6xl md:text-8xl">
          Qui comanda
          <br />
          il Panino!
        </h1>

        <p
          className="animate-spring mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-lg uppercase text-sun md:text-2xl"
          style={{ animationDelay: "0.18s" }}
        >
          <MapPin className="size-4 md:size-5" />
          Mottola (TA)
        </p>

        <p
          className="animate-spring mt-4 max-w-xl text-sm font-semibold text-ink/80 md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Griglia accesa, salse che colano, porzioni da Springfield. Un solo motto:
          Qui comanda il panino!
        </p>

        {/* CONTAINER HERO IMAGE CON COCCARDA SEMIFINALISTA */}
        <div className="relative mt-5 flex flex-col items-center">
          {/* Coccarda Nera con Testo Circolare e Logo Bianco */}
          <div
            className="animate-spring relative z-20 mb-[-24px] sm:mb-[-28px] flex size-24 sm:size-28 items-center justify-center rounded-full bg-ink text-sun shadow-xl ring-4 ring-sun/30"
            style={{ animationDelay: "0.22s" }}
          >
            {/* SVG per testo circolare intorno */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full animate-[spin_20s_linear_infinite] text-white/90"
              aria-hidden="true"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
              </defs>
              <text fontSize="11" fontWeight="bold" letterSpacing="2.5" fill="currentColor">
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  SEMIFINALISTA · SEMIFINALISTA ·
                </textPath>
              </text>
            </svg>

            {/* Logo Bianco Burger Battle */}
            <img
              src="/burger-battle.png"
              alt="Burger Battle Logo"
              width={48}
              height={48}
              className="relative z-10 size-11 sm:size-12 object-contain brightness-0 invert drop-shadow"
            />
          </div>

          <img
            src={heroBurger}
            alt="Doppio hamburger illustrato in stile cartoon"
            width={1024}
            height={1024}
            className="animate-wobble w-[75%] max-w-[280px] sm:max-w-md drop-shadow-[10px_14px_0_rgba(0,0,0,0.18)]"
          />
        </div>

        <Link
          to="/menu"
          className="animate-spring group mt-4 flex w-full max-w-xl flex-col items-center rounded-[2rem] bg-ink px-6 py-6 text-sun transition-transform hover:scale-[1.03] md:py-8"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="font-display text-5xl uppercase leading-none sm:text-6xl md:text-7xl">
            Menu
          </span>
          <span className="mt-1.5 inline-flex items-center gap-2 font-display text-xs uppercase text-sun/80 md:text-base">
            Panini, combo e special
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="mt-8 grid w-full gap-2.5 sm:grid-cols-3">
          {[
            { v: "Menu combo completi" },
            { v: "Panini in carta" },
            { v: "Oltre 2200 recensioni" },
          ].map((s, i) => (
            <div
              key={s.v}
              className="reveal glass-card flex items-center justify-center gap-2 rounded-2xl px-4 py-4"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="size-2 rounded-full bg-primary" />
              <p className="text-sm font-bold text-ink">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* I NOSTRI PANINI */}
      <section aria-labelledby="panini" className="relative z-10 w-full px-4 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2
            id="panini"
            className="reveal text-center font-display text-3xl uppercase text-paper text-stroke-ink md:text-5xl"
          >
            I nostri panini
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                className="reveal glass-card overflow-hidden rounded-3xl"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-64"
                />
                <div className="p-5">
                  <h3 className="font-display text-xl uppercase text-ink">{c.title}</h3>
                  <p className="mt-1.5 text-xs font-semibold text-ink/75">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LAVORA CON NOI */}
      {isHiring ? (
        <section aria-labelledby="hiring" className="relative z-10 w-full px-4 py-8 md:px-6">
          <div className="reveal mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-[2rem] bg-ink px-6 py-8 text-center text-sun md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className="size-8 shrink-0 text-primary" />
              <div>
                <h2 id="hiring" className="font-display text-2xl uppercase md:text-3xl">
                  Siamo alla ricerca di personale!
                </h2>
                <p className="text-xs font-semibold text-sun/75">
                  Invia il tuo CV e vieni in griglia con noi.
                </p>
              </div>
            </div>
            <Link
              to="/lavora-con-noi"
              className="shrink-0 rounded-full bg-primary px-6 py-3 font-display text-sm uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Invia il tuo CV
            </Link>
          </div>
        </section>
      ) : null}

      {/* RECENSIONI */}
      <section aria-labelledby="recensioni" className="relative z-10 w-full bg-paper/50 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2
            id="recensioni"
            className="reveal text-center font-display text-3xl uppercase text-ink md:text-5xl"
          >
            Recensioni
          </h2>
          <div className="reveal mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sun">
            <span className="font-display text-xl">4.2/5</span>
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span className="text-xs font-semibold text-sun/80">oltre 2200 recensioni</span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {homeReviews.map((r, i) => (
              <article
                key={r.name}
                className="reveal glass-card rounded-3xl p-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium leading-relaxed text-ink/80">“{r.text}”</p>
                <p className="mt-3 font-display text-sm uppercase text-ink">{r.name}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-6 text-center">
            <Link
              to="/recensioni"
              className="glass rounded-full px-6 py-3 font-display text-base uppercase text-ink transition-transform hover:scale-105"
            >
              Le recensioni complete
            </Link>
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section aria-labelledby="contatti" className="relative z-10 w-full bg-ink px-4 py-14 text-sun md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 id="contatti" className="reveal text-center font-display text-3xl uppercase md:text-5xl">
            Contatti
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                Icon: MapPin,
                title: "Indirizzo",
                body: ["Piazza Trieste, 35", "74017 Mottola (TA)"],
              },
              {
                Icon: Phone,
                title: "Telefono",
                body: ["+39 333 296 8401"],
                href: "tel:+393332968401",
              },
              { Icon: Clock, title: "Orari", body: ["Tutti i giorni", "18:00 – 00:30"] },
            ].map((c, i) => (
              <div
                key={c.title}
                className="reveal rounded-3xl border-2 border-sun/20 bg-sun/5 p-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <c.Icon className="size-5 text-primary" />
                <h3 className="mt-2 font-display text-lg uppercase">{c.title}</h3>
                {c.body.map((b) =>
                  c.href ? (
                    <a
                      key={b}
                      href={c.href}
                      className="block text-xs font-semibold text-sun/80 underline-offset-4 hover:underline"
                    >
                      {b}
                    </a>
                  ) : (
                    <p key={b} className="text-xs font-semibold text-sun/80">
                      {b}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+393332968401"
              className="rounded-full bg-primary px-6 py-3 font-display text-sm uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Chiama subito
            </a>
            <Link
              to="/contatti"
              className="rounded-full border-2 border-sun/40 px-6 py-3 font-display text-sm uppercase text-sun transition-transform hover:scale-105"
            >
              Social e mappa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
