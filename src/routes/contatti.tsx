import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";

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
              <div className="mt-3 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-ink/10 px-4 py-2 font-display text-xs uppercase text-ink hover:bg-ink hover:text-sun transition-colors"
                >
                  <Instagram className="size-4" />
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full bg-ink/10 px-4 py-2 font-display text-xs uppercase text-ink hover:bg-ink hover:text-sun transition-colors"
                >
                  <Facebook className="size-4" />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Mappa grande interattiva */}
          <div className="glass-card reveal lg:col-span-2 overflow-hidden rounded-3xl p-3 flex flex-col">
            <div className="relative w-full h-[450px] lg:h-full min-h-[420px] rounded-2xl overflow-hidden shadow-inner">
              <iframe
                title="Mappa Hill's Burger & Chips"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.697072555776!2d17.0253!3d40.6386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347395000000001%3A0x0!2sMottola%20TA!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
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
                href="https://maps.google.com/?q=Mottola+TA"
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
