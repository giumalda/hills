import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { MenuCard } from "@/components/MenuCard";
import {
  allergeni,
  burgers,
  combos,
  specials,
  piadine,
  fritture,
  piattiCarne,
  insalate,
} from "../data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu completo | Hill's Burger & Chips" },
      {
        name: "description",
        content:
          "Tutti i panini Hill's: 49 burger numerati, gli special, i menu combo a 10€, piadine, fritture, piatti di carne e insalate.",
      },
    ],
  }),
  component: MenuPage,
});

const tabs = [
  { id: "burger", label: "Burger" },
  { id: "special", label: "Special Burger" },
  { id: "combo", label: "Menu Combo" },
  { id: "piadine", label: "Piadine" },
  { id: "fritture", label: "Fritture & Chips" },
  { id: "carne", label: "Piatti di carne" },
  { id: "insalate", label: "Insalate" },
] as const;

function MenuPage() {
  useReveal();
  const [tab, setTab] = useState<string>("burger");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-sun pb-32 pt-28">
      <div className="blob blob-a" aria-hidden="true" />
      <div className="blob blob-b" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <header className="text-center">
          <h1 className="font-display text-4xl uppercase text-paper text-stroke-ink md:text-6xl">
            Il Menu
          </h1>

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-ink/10 bg-paper/50 p-5 text-center shadow-sm">
            <p className="font-display text-lg uppercase text-ink md:text-xl">
              Coperto € 2,00
              <span className="mt-1 block font-sans text-sm font-semibold normal-case text-ink/80 md:ml-2 md:mt-0 md:inline">
                (Aggiunte e varianti calcolate a parte)
              </span>
            </p>
            <div className="mt-3 flex flex-col gap-0.5">
              <p className="text-sm font-medium text-ink/70">
                Numeri originali della carta.
              </p>
              <p className="text-xs text-ink/50">
                *prodotto a temperatura -20°.
              </p>
            </div>
          </div>
        </header>

        {/* Barra categorie con scorrimento e frecce compatte */}
        <div className="sticky top-20 z-30 mx-auto mt-8 flex w-full max-w-3xl items-center gap-1.5 px-2">
          <button
            type="button"
            onClick={() => scrollTabs("left")}
            aria-label="Scorri sinistra"
            className="glass flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div
            ref={scrollRef}
            className="glass flex flex-1 items-center gap-1 overflow-x-auto rounded-full p-1.5 scrollbar-none"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 font-display text-xs uppercase transition-colors md:text-sm ${
                  tab === t.id
                    ? "bg-ink text-sun shadow-sm"
                    : "text-ink/70 hover:bg-paper/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollTabs("right")}
            aria-label="Scorri destra"
            className="glass flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Pulsante Allergeni separato */}
        <div className="relative z-30 mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setTab("allergeni")}
            className={`rounded-full border-2 px-6 py-2 font-display text-sm uppercase transition-colors md:text-base ${
              tab === "allergeni"
                ? "border-ink bg-ink text-sun"
                : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            Tabella Allergeni
          </button>
        </div>

        <div className="mt-10">
          {tab === "burger" ? (
            <div className="space-y-6">
              {/* Box sfida evidenziata */}
              <div className="glass-card reveal rounded-3xl border-2 border-primary/70 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                    <Flame className="size-6" />
                  </div>
                  <div>
                    <span className="inline-block rounded-full bg-primary/15 px-3 py-1 font-display text-xs uppercase text-primary font-bold">
                      Challenge · La Sfida
                    </span>
                    <h3 className="mt-1 font-display text-xl uppercase text-ink">
                      Il Panino Sfida Hill&apos;s
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-ink/75">
                      Chiudi la griglia o alza bandiera bianca: porzioni da record, zero scuse. Chi lo finisce entra nella leggenda (e nello stomaco d&apos;acciaio).
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {burgers.map((b, i) => (
                  <MenuCard key={b.name} item={b} index={i} />
                ))}
              </div>
            </div>
          ) : null}

          {tab === "special" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {specials.map((s, i) => (
                <MenuCard key={s.name} item={s} index={i} />
              ))}
            </div>
          ) : null}

          {tab === "combo" ? (
            <>
              <p className="reveal mb-8 text-center font-display text-2xl text-ink">
                Ogni menu combo costa <span className="text-primary">€ 10</span>. Tutto compreso.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {combos.map((c, i) => (
                  <MenuCard key={c.name} item={c} index={i} />
                ))}
              </div>
            </>
          ) : null}

          {tab === "piadine" ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {piadine.map((p, i) => (
                <div
                  key={p.name}
                  className="glass-card reveal flex flex-col justify-between rounded-3xl p-6"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-xl uppercase text-ink">{p.name}</h3>
                      <span className="font-display text-lg text-primary">€ {p.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-ink/75">{p.ingredients}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "fritture" ? (
            <div className="space-y-6">
              <div className="glass-card reveal rounded-3xl p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="font-display text-2xl uppercase text-ink">Fritture</h3>
                  <span className="text-xs font-semibold uppercase text-primary">6 PZ — € 6,00 (-20°C)</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fritture.items.map((item, i) => (
                    <div key={i} className="glass rounded-2xl px-4 py-3 text-sm font-semibold text-ink/85">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card reveal rounded-3xl p-6 md:p-8">
                <h3 className="font-display text-2xl uppercase text-ink">Patatine (Piccola / Grande)</h3>
                <div className="mt-5 grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                  {fritture.chips.map((chip, i) => (
                    <div key={i} className="glass flex items-center justify-between rounded-2xl px-5 py-3.5">
                      <span className="text-sm font-semibold text-ink/90">{chip.name}</span>
                      <span className="font-display text-sm font-bold text-primary">{chip.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {tab === "carne" ? (
            <div className="glass-card reveal rounded-3xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-display text-2xl uppercase text-ink">Piatti di carne</h3>
                <span className="text-xs font-semibold uppercase text-ink/60">*prodotti a -20°C ove contrassegnati</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {piattiCarne.map((item, i) => (
                  <div key={i} className="glass reveal flex flex-col justify-between rounded-2xl p-5" style={{ transitionDelay: `${i * 40}ms` }}>
                    <span className="text-sm font-semibold leading-snug text-ink/90">{item.name}</span>
                    <span className="mt-3 text-right font-display text-base font-bold text-primary">
                      {typeof item.price === "number" ? `€ ${item.price.toFixed(2)}` : item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === "insalate" ? (
            <div className="grid gap-5 md:grid-cols-2">
              {insalate.map((ins, i) => (
                <div key={i} className="glass-card reveal flex flex-col justify-between rounded-3xl p-6">
                  <p className="text-sm font-semibold leading-relaxed text-ink/85">{ins.ingredients}</p>
                  <p className="mt-4 text-right font-display text-lg text-primary">
                    € {ins.price.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "allergeni" ? (
            <div id="allergeni" className="glass-card reveal rounded-3xl p-6 md:p-8">
              <h2 className="font-display text-2xl uppercase text-ink">Tabella allergeni</h2>
              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {allergeni.map(([, text], i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                    <span className="text-sm font-medium text-ink/75">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
