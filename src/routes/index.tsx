import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Star, BriefcaseBusiness, ArrowRight } from "lucide-react";
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
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <img
        src={fries}
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        className="animate-float pointer-events-none absolute left-[3%] top-[20%] w-32 opacity-95 sm:w-40 md:w-48"
        style={{ animationDelay: "0.5s" }}
      />
      <img
        src={cola}
        alt=""
        aria-hidden="true"
        width={512}
        height={512}
        className="animate-float pointer-events-none absolute right-[5%] top-[14%] w-32 opacity-95 sm:w-40 md:w-48"
        style={{ animationDelay: "1.6s" }}
      />

      {/* HERO */}
      <section className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-5 pb-20 pt-8 text-center">
        <span className="glass animate-spring rounded-full px-5 py-2 font-display text-sm uppercase tracking-wide text-ink md:text-base">
          Paninoteca · Dal 1° panino
        </span>

        <h1 className="animate-spring mt-7 font-display text-5xl uppercase leading-[0.92] text-paper text-stroke-ink sm:text-7xl md:text-8xl">
          Qui comanda
          <br />
          il Panino!
        </h1>

        <p
          className="animate-spring mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-xl uppercase text-sun md:text-2xl"
          style={{ animationDelay: "0.18s" }}
        >
          <MapPin className="size-5" />
          Mottola (TA)
        </p>

        <p
          className="animate-spring mt-6 max-w-xl text-base font-semibold text-ink/80 md:text-lg"
          style={{ animationDelay: "0.3s" }}
        >
          Griglia accesa, salse che colano, porzioni da Springfield. Un solo motto:
          niente panini timidi.
        </p>

        <img
          src={heroBurger}
          alt="Doppio hamburger illustrato in stile cartoon"
          width={1024}
          height={1024}
          className="animate-wobble mt-6 w-[68%] max-w-md drop-shadow-[14px_18px_0_rgba(0,0,0,0.2)]"
        />

        <Link
          to="/menu"
          className="animate-spring group mt-4 flex w-full max-w-2xl flex-col items-center rounded-[2.5rem] bg-ink px-8 py-8 text-sun transition-transform hover:scale-[1.03] md:py-10"
          style={{ animationDelay: "0.45s" }}
        >
          <span className="font-display text-6xl uppercase leading-none sm:text-7xl md:text-8xl">
            Menu
          </span>
          <span className="mt-2 inline-flex items-center gap-2 font-display text-base uppercase text-sun/80 md:text-xl">
            Panini, combo e special
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {[
            { v: "Menu combo completi" },
            { v: "Panini in carta" },
            { v: "Oltre 2200 recensioni" },
          ].map((s, i) => (
            <div
              key={s.v}
              className="reveal glass-card flex items-center justify-center gap-2.5 rounded-3xl px-5 py-6"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="size-2.5 rounded-full bg-primary" />
              <p className="text-base font-bold text-ink">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* I NOSTRI PANINI */}
      <section aria-labelledby="panini" className="relative w-full px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2
            id="panini"
            className="reveal text-center font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl"
          >
            I nostri panini
          </h2>
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
                className="reveal glass-card overflow-hidden rounded-3xl"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <img
                  src={c.img}
                  alt={c.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105 md:h-72"
                />
                <div className="p-6">
                  <h3 className="font-display text-2xl uppercase text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-ink/70">{c.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LAVORA CON NOI */}
      {isHiring ? (
        <section aria-labelledby="hiring" className="relative w-full px-4 py-10 md:px-6">
          <div className="reveal mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-[2rem] bg-ink px-6 py-10 text-center text-sun md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-4">
              <BriefcaseBusiness className="size-10 shrink-0 text-primary" />
              <div>
                <h2 id="hiring" className="font-display text-3xl uppercase md:text-4xl">
                  Siamo alla ricerca di personale!
                </h2>
                <p className="mt-1 text-sm font-semibold text-sun/75">
                  Invia il tuo CV e vieni in griglia con noi.
                </p>
              </div>
            </div>
            <Link
              to="/lavora-con-noi"
              className="rounded-full bg-primary px-7 py-4 font-display text-lg uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Invia il tuo CV
            </Link>
          </div>
        </section>
      ) : null}

      {/* RECENSIONI */}
      <section aria-labelledby="recensioni" className="relative w-full bg-paper/50 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2
            id="recensioni"
            className="reveal text-center font-display text-4xl uppercase text-ink md:text-6xl"
          >
            Recensioni
          </h2>
          <div className="reveal mx-auto mt-5 flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3 text-sun">
            <span className="font-display text-2xl">4.2/5</span>
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="text-sm font-semibold text-sun/80">oltre 2200 recensioni</span>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {reviews.map((r, i) => (
              <article
                key={r.name}
                className="reveal glass-card rounded-3xl p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-ink/80">“{r.text}”</p>
                <p className="mt-4 font-display text-base uppercase text-ink">{r.name}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-8 text-center">
            <Link
              to="/recensioni"
              className="glass rounded-full px-7 py-4 font-display text-lg uppercase text-ink transition-transform hover:scale-105"
            >
              Tutte le recensioni
            </Link>
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section aria-labelledby="contatti" className="relative w-full bg-ink px-4 py-16 text-sun md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 id="contatti" className="reveal text-center font-display text-4xl uppercase md:text-6xl">
            Contatti
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
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
                className="reveal rounded-3xl border-2 border-sun/20 bg-sun/5 p-6"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <c.Icon className="size-6 text-primary" />
                <h3 className="mt-3 font-display text-xl uppercase">{c.title}</h3>
                {c.body.map((b) =>
                  c.href ? (
                    <a
                      key={b}
                      href={c.href}
                      className="block text-sm font-semibold text-sun/80 underline-offset-4 hover:underline"
                    >
                      {b}
                    </a>
                  ) : (
                    <p key={b} className="text-sm font-semibold text-sun/80">
                      {b}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>

          <div className="reveal mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+393332968401"
              className="rounded-full bg-primary px-7 py-4 font-display text-lg uppercase text-primary-foreground transition-transform hover:scale-105"
            >
              Chiama subito
            </a>
            <Link
              to="/contatti"
              className="rounded-full border-2 border-sun/40 px-7 py-4 font-display text-lg uppercase text-sun transition-transform hover:scale-105"
            >
              Social e mappa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
