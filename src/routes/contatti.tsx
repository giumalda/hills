import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

// Icona TikTok personalizzata pulita
function TikTokIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti & Dove siamo | Hill's Burger & Chips" },
      {
        name: "description",
        content: "Vieni a trovarci a Mottola. Orari, telefono, social e mappa interattiva.",
      },
    ],
  }),
  component: ContattiPage,
});

function ContattiPage() {
  useReveal();

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Dove Siamo
          </h1>
          <p className="mt-4 font-display text-lg uppercase text-ink/80 md:text-xl">
            Passa a trovarci da Hill&apos;s Burger & Chips a Mottola
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Informazioni testuali / card di recap */}
          <div className="space-y-6">
            <div className="glass-card reveal rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-sun">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-ink">Indirizzo</h3>
                  <p className="mt-1 text-sm font-semibold text-ink/75">
                    Via Mazzini / Centro, Mottola (TA)
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card reveal rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-sun">
                  <Clock className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-ink">Orari</h3>
                  <p className="mt-1 text-sm font-semibold text-ink/75">
                    Tutti i giorni: 18:00 – 00:30
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card reveal rounded-3xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-sun">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl uppercase text-ink">Telefono / Ordini</h3>
                  <a
                    href="tel:+393332968401"
                    className="mt-1 block text-sm font-bold text-primary hover:underline"
                  >
                    +39 333 296 8401
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card reveal rounded-3xl p-6">
              <h3 className="font-display text-lg uppercase text-ink">Seguici</h3>
              <div className="mt-3 flex flex-col gap-2.5">
                {/* Instagram in evidenza e più grande */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-full bg-ink px-5 py-3 font-display text-sm uppercase text-sun transition-transform hover:scale-[1.02] shadow-sm"
                >
                  <Instagram className="size-5" />
                  Instagram Ufficiale
                </a>

                {/* Secondaria riga con Facebook e TikTok */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-ink/10 px-3 py-2.5 font-display text-xs uppercase text-ink hover:bg-ink hover:text-sun transition-colors"
                  >
                    <Facebook className="size-4" />
                    Facebook
                  </a>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-ink/10 px-3 py-2.5 font-display text-xs uppercase text-ink hover:bg-ink hover:text-sun transition-colors"
                  >
                    <TikTokIcon className="size-4" />
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mappa grande interattiva con pin preciso su Mottola */}
          <div className="glass-card reveal lg:col-span-2 overflow-hidden rounded-3xl p-3 flex flex-col">
            <div className="relative w-full h-[450px] lg:h-full min-h-[420px] rounded-2xl overflow-hidden shadow-inner">
              <iframe
                title="Mappa Hill's Burger & Chips"
                src="https://www.google.com/maps?q=40.6385,17.0250&hl=it&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[105%]"
              />
            </div>
            <div className="mt-3 px-3 pb-1 flex items-center justify-between text-xs font-semibold text-ink/60">
              <span>Mottola (TA), Puglia</span>
              <a
                href="https://maps.google.com/?q=40.6385,17.0250"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-bold"
              >
                Apri su Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
