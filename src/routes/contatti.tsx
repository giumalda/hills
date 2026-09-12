import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti e social | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Dove trovarci a Mottola (TA), orari di apertura, telefono e i profili Instagram, Facebook e WhatsApp di Hill's Burger & Chips.",
      },
      { property: "og:title", content: "Contatti e social | Hill's Burger & Chips" },
      {
        property: "og:description",
        content: "Indirizzo, orari, telefono e social di Hill's Burger & Chips a Mottola (TA).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactsPage,
});

const socials = [
  {
    label: "Instagram",
    handle: "@hillsburgerchips",
    href: "https://instagram.com/",
    Icon: Instagram,
    featured: true,
  },
  { label: "Facebook", handle: "Hill's Burger & Chips", href: "https://facebook.com/", Icon: Facebook },
  { label: "WhatsApp", handle: "Ordina in chat", href: "https://wa.me/393332968401", Icon: MessageCircle },
];

function ContactsPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Contatti
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold text-ink/75 md:text-base">
            Passa a trovarci, chiamaci o scrivici sui social.
          </p>
        </header>

        <section aria-label="Social" className="mt-12">
          <h2 className="reveal text-center font-display text-3xl uppercase text-ink md:text-4xl">
            Seguici
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`reveal group flex items-center gap-4 rounded-3xl p-5 transition-transform hover:scale-[1.03] ${
                  s.featured ? "glass-card ring-2 ring-primary/60" : "glass-card"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span
                  className={`flex size-12 items-center justify-center rounded-2xl ${
                    s.featured ? "bg-primary text-primary-foreground" : "bg-ink text-sun"
                  }`}
                >
                  <s.Icon className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-lg uppercase text-ink">{s.label}</span>
                  <span className="block text-sm font-semibold text-ink/65">{s.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section aria-label="Informazioni" className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { Icon: MapPin, title: "Dove siamo", body: ["Corso Vittorio Emanuele", "74017 Mottola (TA)"] },
            { Icon: Phone, title: "Chiamaci", body: ["+39 333 296 8401", "ciao@hillsburger.it"] },
            { Icon: Clock, title: "Orari", body: ["Mar – Dom", "18:00 – 00:30"] },
          ].map((c, i) => (
            <div
              key={c.title}
              className="reveal glass-card rounded-3xl p-6"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <c.Icon className="size-6 text-primary" />
              <h3 className="mt-3 font-display text-xl uppercase text-ink">{c.title}</h3>
              {c.body.map((b) => (
                <p key={b} className="text-sm font-semibold text-ink/70">
                  {b}
                </p>
              ))}
            </div>
          ))}
        </section>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          <Link
            to="/recensioni"
            className="glass rounded-full px-7 py-4 font-display text-lg uppercase text-ink transition-transform hover:scale-105"
          >
            Leggi le recensioni
          </Link>
          <Link
            to="/lavora-con-noi"
            className="rounded-full bg-ink px-7 py-4 font-display text-lg uppercase text-sun transition-transform hover:scale-105"
          >
            Lavora con noi
          </Link>
        </div>
      </div>
    </main>
  );
}
